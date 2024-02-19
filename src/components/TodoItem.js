import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ todo, deleteTodo, toggleTodo, toggleImportant }) {
  return (
    <li className={`flex flex-col sm:flex-row items-center justify-between bg-white border-b border-gray-300 px-4 py-2 ${todo.important ? 'bg-teal-100' : ''}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mr-4"
        />
        <div>
          <h3 className={`font-semibold ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
      </div>
      <div className="flex mt-2 sm:mt-0">
        {!todo.completed && (
          <button
            onClick={() => toggleImportant(todo.id)}
            className={`mr-4 text-sm w-8 h-8 ${todo.important ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-400`}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-500 hover:text-red-600 w-8 h-8"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;