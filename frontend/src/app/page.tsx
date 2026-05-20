import { TodoList } from '../components/todo-list';

export default function Home() {
  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI-Ready TodoList</h1>
        <p className="text-sm text-gray-500 mt-1">
          Projeto de referência do e-book{' '}
          <a
            href="https://linkedin.com/in/felipe-que-fez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            AI-Ready
          </a>
        </p>
      </div>
      <TodoList />
    </main>
  );
}
