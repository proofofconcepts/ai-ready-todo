'use client';

import { useEffect, useState, useCallback } from 'react';
import { Todo } from '../lib/types';
import { getTodos } from '../lib/api';
import { TodoItem } from './todo-item';
import { AddTodoForm } from './add-todo-form';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      setError('');
    } catch {
      setError('Erro ao carregar tarefas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const pending = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);
  const progress = todos.length > 0 ? Math.round((completed.length / todos.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Carregando tarefas...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center animate-fade-in">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AddTodoForm onCreated={fetchTodos} />

      {todos.length > 0 && (
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">
              {completed.length} de {todos.length} concluídas
            </span>
            <span className="text-xs font-bold text-violet-400">{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {todos.length === 0 ? (
        <div className="bg-slate-800/20 border border-slate-700/20 rounded-2xl py-14 px-6 text-center animate-fade-in">
          <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm font-medium">Nenhuma tarefa ainda</p>
          <p className="text-slate-600 text-xs mt-1">Adicione sua primeira tarefa acima</p>
        </div>
      ) : (
        <div className="space-y-5">
          {pending.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pendentes</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                  {pending.length}
                </span>
              </div>
              {pending.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onChanged={fetchTodos} />
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Concluídas</span>
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-xs font-medium">
                  {completed.length}
                </span>
              </div>
              {completed.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onChanged={fetchTodos} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
