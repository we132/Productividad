
import { useStore } from './store';

function App() {
  const xp = useStore((state) => state.xp);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Toolbox Sidebar (Left) */}
      <aside className="w-[20%] border-r border-zinc-800 bg-zinc-900/50 p-4 flex flex-col">
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent mb-6">
          Toolbox
        </h2>
        <div className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800/50 p-4">
          <p className="text-zinc-500 text-sm">Snippet Manager (Coming Soon)</p>
        </div>
      </aside>

      {/* Main Kanban Board (Center) */}
      <main className="flex-1 flex flex-col p-6 min-w-0">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">The Forge</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">XP:</span>
            <span className="font-mono text-fuchsia-400 font-bold">{xp}</span>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
          {/* Columns placeholder */}
          {['To Do', 'In Progress', 'Done'].map((col) => (
            <div key={col} className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 flex flex-col">
              <h3 className="font-semibold text-zinc-300 mb-4">{col}</h3>
              <div className="flex-1 border-2 border-dashed border-zinc-800/50 rounded-xl" />
            </div>
          ))}
        </div>
      </main>

      {/* Pomodoro & Avatar Sidebar (Right) */}
      <aside className="w-[25%] border-l border-zinc-800 bg-zinc-900/50 p-6 flex flex-col gap-6">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800/50 aspect-square flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-zinc-500">Avatar Space</p>
        </div>

        <div className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-800/50 p-6 flex flex-col items-center justify-center">
          <div className="text-5xl font-mono font-bold text-zinc-100 mb-4 tracking-tighter">
            25:00
          </div>
          <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
            Start Focus
          </button>
        </div>
      </aside>
    </div>
  )
}

export default App
