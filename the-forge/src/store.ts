import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
}

interface AppState {
    tasks: Task[];
    xp: number;
    addTask: (title: string, status?: TaskStatus) => void;
    updateTaskStatus: (id: string, status: TaskStatus) => void;
    addXP: (amount: number) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            tasks: [
                { id: '1', title: 'Diseñar el Kanban', status: 'done' },
                { id: '2', title: 'Integrar temporizador Pomodoro', status: 'in-progress' },
                { id: '3', title: 'Crear sistema de XP', status: 'todo' },
            ],
            xp: 0,
            addTask: (title, status = 'todo') => set((state) => ({
                tasks: [...state.tasks, { id: crypto.randomUUID(), title, status }]
            })),
            updateTaskStatus: (id, status) => set((state) => ({
                tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
            })),
            addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
        }),
        {
            name: 'the-forge-storage',
        }
    )
)
