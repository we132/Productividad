import { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragOverEvent,
    type DragEndEvent
} from '@dnd-kit/core';
import { useStore, type TaskStatus, type Task } from '../store';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
    onStartFocus: (taskId: string) => void;
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
];

export function KanbanBoard({ onStartFocus }: KanbanBoardProps) {
    const tasks = useStore((state) => state.tasks);
    const updateTaskStatus = useStore((state) => state.updateTaskStatus);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.sortable;
        const isOverTask = over.data.current?.sortable;

        // Si estamos soltando sobre otra tarea, o sobre una columna vacía
        if (!isActiveTask || isOverTask) return;

    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeTask = tasks.find(t => t.id === activeId);
        if (!activeTask) return;

        // Is dropping over a column area?
        const isOverColumn = COLUMNS.some(col => col.id === overId);

        if (isOverColumn) {
            updateTaskStatus(activeId, overId as TaskStatus);
            return;
        }

        // Is dropping over another task?
        const overTask = tasks.find(t => t.id === overId);
        if (overTask && overTask.status !== activeTask.status) {
            updateTaskStatus(activeId, overTask.status);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden min-h-0">
                {COLUMNS.map((col) => (
                    <KanbanColumn
                        key={col.id}
                        status={col.id}
                        title={col.id === 'todo' ? 'To Do' : col.id === 'in-progress' ? 'In Progress' : 'Done'}
                        tasks={tasks.filter((t) => t.status === col.id)}
                        onStartPomodoro={onStartFocus}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeTask ? (
                    <TaskCard task={activeTask} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
