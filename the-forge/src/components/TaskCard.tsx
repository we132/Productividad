import { useSortable } from '@dnd-kit/sortable';
import { type Task } from '../store';
import { cn } from '../lib/utils';
import { Play } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onStartPomodoro?: (taskId: string) => void;
}

export function TaskCard({ task, onStartPomodoro }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group relative p-4 mb-3 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-zinc-500 cursor-grab active:cursor-grabbing transition-colors",
                isDragging && "opacity-50 z-50",
                task.status === 'in-progress' && "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            )}
        >
            <div className="flex justify-between items-start gap-3">
                <p className="text-zinc-200 text-sm font-medium leading-snug">
                    {task.title}
                </p>

                {task.status === 'in-progress' && onStartPomodoro && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onStartPomodoro(task.id);
                        }}
                        className="shrink-0 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
                        title="Start Focus Session"
                    >
                        <Play className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
