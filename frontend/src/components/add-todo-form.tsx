'use client';

import { useState } from 'react';
import { createTodo } from '../lib/api';

const MAX_LENGTH = 255;

interface Props {
  onCreated: () => void;
}

export function AddTodoForm({ onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError('');
    try {
      await createTodo(title.trim());
      setTitle('');
      onCreated();
    } catch {
      setError('Erro ao criar tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const remaining = MAX_LENGTH - title.length;
  const isNearLimit = remaining <= 30;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 focus-within:border-violet-500/50 focus-within:bg-slate-800/90 transition-all duration-200">
        <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa..."
          maxLength={MAX_LENGTH}
          className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
        />
        {title.length > 0 && (
          <span className={`text-xs tabular-nums transition-colors ${isNearLimit ? 'text-amber-400' : 'text-slate-600'}`}>
            {remaining}
          </span>
        )}
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border border-slate-400 border-t-transparent rounded-full animate-spin" />
              Adicionando
            </span>
          ) : (
            'Adicionar'
          )}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-400 px-1 animate-fade-in">{error}</p>
      )}
    </form>
  );
}
