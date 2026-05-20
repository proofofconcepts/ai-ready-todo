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
    <div className={`flex items-center gap-3 p-4 bg-white rounded-lg border transition-all ${todo.completed ? 'opacity-60 border-gray-200' : 'border-gray-300 shadow-sm'}`}>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 hover:border-blue-500'}`}
      >
        {todo.completed && (
          <svg viewBox="0 0 20 20" fill="white" className="w-full h-full p-0.5">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {todo.title}
      </span>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
        title="Remover"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
