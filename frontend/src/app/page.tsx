import { TodoList } from '../components/todo-list';

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/30 mb-4">
            <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI-Ready TodoList</h1>
          <p className="text-sm text-slate-400 mt-1">
            Projeto de referência do{' '}
            <a
              href="https://linkedin.com/in/felipe-que-fez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              e-book AI-Ready
            </a>
          </p>
        </div>
        <TodoList />
      </div>
    </main>
  );
}
