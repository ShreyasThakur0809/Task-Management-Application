import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { FilterTabs } from './components/FilterTabs';
import { EmptyState } from './components/EmptyState';
import { useTodos } from './hooks/useTodos';
import { FilterType } from './types/Todo';

function App() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { addTodo, toggleTodo, deleteTodo, editTodo, getFilteredTodos, getCounts } = useTodos();

  const filteredTodos = getFilteredTodos(filter);
  const counts = getCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoApp
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Stay organized and productive with your daily tasks
          </p>
        </header>

        {/* Add Todo Form */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filter Tabs */}
        {counts.all > 0 && (
          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        {counts.all > 0 && (
          <footer className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{counts.active}</span> active
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">{counts.completed}</span> completed
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{counts.all}</span> total
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;