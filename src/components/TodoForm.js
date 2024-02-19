
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Load title and description from local storage on component mount
  useEffect(() => {
    const storedTitle = localStorage.getItem('todoTitle') || '';
    const storedDescription = localStorage.getItem('todoDescription') || '';
    setTitle(storedTitle);
    setDescription(storedDescription);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({
      id: Date.now(),
      title,
      description,
      completed: false,
      important: false
    });
    setTitle('');
    setDescription('');
    // Store title and description in local storage
    localStorage.setItem('todoTitle', '');
    localStorage.setItem('todoDescription', '');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Store title in local storage
    localStorage.setItem('todoTitle', newTitle);
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    // Store description in local storage
    localStorage.setItem('todoDescription', newDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="flex-1 mb-2 sm:mr-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        className="flex-1 mb-2 sm:mr-2 sm:mb-0 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
      />
      <button type="submit" className="bg-teal-500 text-white rounded-3xl p-2">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}

export default TodoForm;