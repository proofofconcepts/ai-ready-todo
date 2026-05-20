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

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div>
      <AddTodoForm onCreated={fetchTodos} />

      {todos.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg">Nenhuma tarefa ainda.</p>
          <p className="text-sm mt-1">Adicione sua primeira tarefa acima.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Pendentes ({pending.length})
              </h2>
              <div className="space-y-2">
                {pending.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onChanged={fetchTodos} />
                ))}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Concluídas ({completed.length})
              </h2>
              <div className="space-y-2">
                {completed.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onChanged={fetchTodos} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
