import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate
    };

    axios.post('http://localhost:8080/api/tasks', task)
      .then(response => {
        onTaskAdded(response.data); // notify parent
        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      /><br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
