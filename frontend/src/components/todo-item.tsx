'use client';

import { useState } from 'react';
import { Todo } from '../lib/types';
import { completeTodo, reopenTodo, deleteTodo } from '../lib/api';

interface Props {
  todo: Todo;
  onChanged: () => void;
}

export function TodoItem({ todo, onChanged }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      todo.completed ? await reopenTodo(todo.id) : await completeTodo(todo.id);
      onChanged();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteTodo(todo.id);
      onChanged();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 animate-slide-up ${
      todo.completed
        ? 'bg-slate-800/20 border-slate-700/30'
        : 'bg-slate-800/60 border-slate-700/50 hover:border-violet-500/30 hover:bg-slate-800/80'
    }`}>
      <button
        onClick={handleToggle}
        disabled={loading}
        title={todo.completed ? 'Reabrir' : 'Concluir'}
        className={`relative flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          loading ? 'opacity-40' : ''
        } ${
          todo.completed
            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 border-violet-500'
            : 'border-slate-600 hover:border-violet-400'
        }`}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3">
            <path fillRule="evenodd" d="M10.293 2.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L5 7.586l5.293-5.293z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm leading-relaxed transition-all duration-200 ${
        todo.completed ? 'line-through text-slate-500' : 'text-slate-200'
      }`}>
        {todo.title}
      </span>

      <button
        onClick={handleDelete}
        disabled={loading}
        title="Remover"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
