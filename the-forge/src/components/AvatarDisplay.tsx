import { useStore } from '../store';

import { User } from 'lucide-react';

export function AvatarDisplay() {
    const xp = useStore(state => state.xp);

    // Calculate Level (every 100 XP is a level)
    const currentLevel = Math.floor(xp / 100) + 1;
    const xpInCurrentLevel = xp % 100;
    const progressPercentage = xpInCurrentLevel; // since it's out of 100

    return (
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800/50 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Avatar Image Placeholder */}
            <div className="w-32 h-32 mb-6 relative">
                <div className="absolute inset-0 bg-zinc-800 rounded-2xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-fuchsia-400/20 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center justify-center">
                    {/* We use a Lucide icon as a placeholder since we don't have a real pixel art yet */}
                    <User className="w-16 h-16 text-zinc-500" />
                </div>

                {/* Level Badge */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-zinc-950 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-emerald-400 text-sm">{currentLevel}</span>
                </div>
            </div>

            <div className="w-full text-center space-y-2 relative z-10">
                <h3 className="font-bold text-lg text-zinc-100">The Initiate</h3>

                {/* XP Bar */}
                <div className="w-full space-y-1">
                    <div className="flex justify-between text-xs font-mono text-zinc-500">
                        <span>XP</span>
                        <span>{xpInCurrentLevel} / 100</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
