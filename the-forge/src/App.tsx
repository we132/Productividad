import { useState } from 'react';
import { useStore } from './store';
import { KanbanBoard } from './components/KanbanBoard';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AvatarDisplay } from './components/AvatarDisplay';
import { Plus } from 'lucide-react';

function App() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const xp = useStore((state) => state.xp);
  const addTask = useStore((state) => state.addTask);

  const handleStartFocus = (taskId: string) => {
    setActiveTaskId(taskId);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Toolbox Sidebar (Left) */}
      <aside className="w-[20%] border-r border-zinc-800 bg-zinc-900/50 p-4 flex flex-col">
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-6">
          Toolbox
        </h2>

        <form onSubmit={handleAddTask} className="mb-6 relative">
          <input
            type="text"
            placeholder="Add quick task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-emerald-400 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        <div className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800/50 p-4">
          <p className="text-zinc-500 text-sm">Snippet Manager (Coming Soon)</p>
        </div>
      </aside>

      {/* Main Kanban Board (Center) */}
      <main className="flex-1 flex flex-col p-6 min-w-0">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">The Forge</h1>
          <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
            <span className="text-sm text-zinc-400">XP:</span>
            <span className="font-mono text-emerald-400 font-bold">{xp}</span>
          </div>
        </header>

        <KanbanBoard onStartFocus={handleStartFocus} />
      </main>

      {/* Pomodoro & Avatar Sidebar (Right) */}
      <aside className="w-[25%] border-l border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-6">
        <AvatarDisplay />
        <PomodoroTimer activeTaskId={activeTaskId} />
      </aside>
    </div>
  )
}

export default App
