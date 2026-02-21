import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Play, Square, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

interface PomodoroTimerProps {
    activeTaskId: string | null;
}

const POMODORO_TIME = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes

export function PomodoroTimer({ activeTaskId }: PomodoroTimerProps) {
    const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    const tasks = useStore(state => state.tasks);
    const addXP = useStore(state => state.addXP);

    const activeTask = tasks.find(t => t.id === activeTaskId);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            setIsActive(false);
            // Session Complete Logic
            if (mode === 'focus') {
                addXP(50); // Rewarding 50 XP for a successful focus session
                setMode('break');
                setTimeLeft(SHORT_BREAK);
                // Play success sound here if we add one!
            } else {
                setMode('focus');
                setTimeLeft(POMODORO_TIME);
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, mode, addXP]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? POMODORO_TIME : SHORT_BREAK);
    };

    const skipToBreak = () => {
        setIsActive(false);
        setMode('break');
        setTimeLeft(SHORT_BREAK);
    };

    const skipToFocus = () => {
        setIsActive(false);
        setMode('focus');
        setTimeLeft(POMODORO_TIME);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = mode === 'focus'
        ? ((POMODORO_TIME - timeLeft) / POMODORO_TIME) * 100
        : ((SHORT_BREAK - timeLeft) / SHORT_BREAK) * 100;

    return (
        <div className={cn(
            "flex-1 rounded-2xl bg-zinc-900 border p-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500",
            mode === 'focus' ? "border-emerald-500/20" : "border-fuchsia-500/20"
        )}>
            {/* Background Progress */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 w-full opacity-10 transition-all duration-1000 ease-linear",
                    mode === 'focus' ? "bg-emerald-500" : "bg-fuchsia-500"
                )}
                style={{ height: `${progress}%` }}
            />

            <div className="z-10 w-full flex flex-col items-center">
                {/* Active Task Info */}
                <div className="h-10 mb-2 text-center flex items-center justify-center">
                    {activeTask ? (
                        <p className="text-zinc-300 text-sm font-medium animate-pulse">
                            Focusing on: <span className="text-emerald-400">{activeTask.title}</span>
                        </p>
                    ) : (
                        <p className="text-zinc-500 text-sm">Select a task from Kanban to focus</p>
                    )}
                </div>

                {/* Timer Display */}
                <div className={cn(
                    "text-6xl font-mono font-bold mb-8 tracking-tighter transition-colors",
                    mode === 'focus' ? "text-zinc-100" : "text-fuchsia-100"
                )}>
                    {formatTime(timeLeft)}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 w-full">
                    <button
                        onClick={resetTimer}
                        className="p-3 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors"
                        title="Reset Timer"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>

                    <button
                        onClick={toggleTimer}
                        className={cn(
                            "flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                            mode === 'focus'
                                ? isActive
                                    ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                                    : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                : isActive
                                    ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                                    : "bg-fuchsia-500 hover:bg-fuchsia-400 text-zinc-950 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                        )}
                    >
                        {isActive ? (
                            <>
                                <Square className="w-5 h-5 fill-current" /> Pause
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 fill-current" /> Start {mode === 'focus' ? 'Focus' : 'Break'}
                            </>
                        )}
                    </button>
                </div>

                {/* Mode Switcher */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={skipToFocus}
                        className={cn(
                            "text-xs px-3 py-1 rounded-full font-medium transition-colors",
                            mode === 'focus' ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Focus
                    </button>
                    <button
                        onClick={skipToBreak}
                        className={cn(
                            "text-xs px-3 py-1 rounded-full font-medium transition-colors",
                            mode === 'break' ? "bg-fuchsia-500/20 text-fuchsia-400" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Break
                    </button>
                </div>
            </div>
        </div>
    );
}
