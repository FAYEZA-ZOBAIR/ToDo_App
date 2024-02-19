import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [completedCount, setCompletedCount] = useState(0);

  // Function to add a new todo
  const addTodo = (todo) => {
    const updatedTodos = [todo, ...todos];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to toggle the importance status of a todo
  const toggleImportant = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to filter tasks
  const filteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  // Function to clear all completed todos
  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Update completed count whenever todos change
  useEffect(() => {
    const completedTasks = todos.filter(todo => todo.completed);
    setCompletedCount(completedTasks.length);
  }, [todos]);

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Set filter to 'all' when component mounts
  useEffect(() => {
    setFilter('all');
  }, []);

  return (
    <div className='overflow-hidden'>
      <div>
        <section>
          <div
            className="w-screen bg-opacity-60 bg-cover bg-center min-h-[30vh] flex items-center justify-start overflow-hidden relative"
            style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/teal-green-wallpaper-with-large-leaf-pattern-gold-dark-green-background_605423-9606.jpg') ` }}>
          </div>
        </section>
      </div>
      <div className="max-w-lg mx-auto mt-8 p-4 bg-teal-50 rounded-lg shadow-lg overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-4 text-center text-teal-600">Your Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <div className="mt-4 flex">
          <button onClick={() => setFilter('all')} className={`mr-2 px-4 py-2 bg-teal-500 text-white rounded-lg focus:outline-none focus:bg-teal-600  ${filter === 'all' && 'bg-teal-600'}`}>All</button>
          <button onClick={() => setFilter('completed')} className={`mr-2 px-4 py-2 bg-teal-500 text-white rounded-lg focus:outline-none focus:bg-teal-600 ${filter === 'completed' && 'bg-teal-600'}`}>Completed</button>
          <button onClick={() => setFilter('active')} className={`px-4 py-2 bg-teal-500 text-white rounded-lg focus:outline-none focus:bg-teal-600 ${filter === 'active' && 'bg-blue-teal'}`}>Active</button>
          <button onClick={clearCompletedTodos} className="ml-auto px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:bg-teal-600">Clear Completed</button>
        </div>
        <ul className="mt-4">
          {filteredTodos().map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              toggleImportant={toggleImportant}
            />
          ))}
        </ul>
        {completedCount === todos.length && completedCount > 0 && (
          <p className="text-center text-green-600 mt-4">Congratulations! All tasks completed.</p>
        )}
        {completedCount === 0 && (
          <p className="text-center text-gray-600 mt-4">No tasks completed yet.</p>
        )}
        {completedCount > 0 && completedCount < todos.length && (
          <p className="text-center text-gray-600 mt-4">{completedCount} out of {todos.length} task(s) completed.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;