import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { type Task, type TaskStatus } from '../store';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
    status: TaskStatus;
    title: string;
    tasks: Task[];
    onStartPomodoro?: (taskId: string) => void;
}

export function KanbanColumn({ status, title, tasks, onStartPomodoro }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex flex-col h-full overflow-hidden flex-1">
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold text-zinc-300">{title}</h3>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">
                    {tasks.length}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className={`flex-1 overflow-y-auto rounded-xl transition-colors p-2 -mx-2 ${isOver ? 'bg-zinc-800/30' : ''
                    }`}
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onStartPomodoro={onStartPomodoro} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
