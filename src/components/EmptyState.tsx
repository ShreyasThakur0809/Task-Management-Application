import React from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import { FilterType } from '../types/Todo';

interface EmptyStateProps {
  filter: FilterType;
}

export function EmptyState({ filter }: EmptyStateProps) {
  const getEmptyState = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <CheckCircle size={48} className="text-green-400" />,
          title: "All done!",
          message: "No active tasks remaining. Great job!"
        };
      case 'completed':
        return {
          icon: <ListTodo size={48} className="text-gray-400" />,
          title: "No completed tasks",
          message: "Complete some tasks to see them here."
        };
      default:
        return {
          icon: <ListTodo size={48} className="text-gray-400" />,
          title: "No todos yet",
          message: "Add a new task to get started with your productivity journey."
        };
    }
  };

  const { icon, title, message } = getEmptyState();

  return (
    <div className="text-center py-16">
      <div className="mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">{message}</p>
    </div>
  );
}