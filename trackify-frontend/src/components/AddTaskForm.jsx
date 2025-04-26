import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium'); // default
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: Title required
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    const task = {
      title,
      description,
      dueDate,
      priority
    };

    axios.post('http://localhost:8080/api/tasks', task)
      .then(response => {
        onTaskAdded(response.data); // notify parent
        // reset form
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Medium');
        setError('');
        setSuccess('Task added successfully!');

        // Hide success after 2 seconds
        setTimeout(() => setSuccess(''), 2000);
      })
      .catch(error => {
        console.error('Error creating task:', error);
        setError('Failed to add task. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h2>Add New Task</h2>

      {/* Show messages */}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}

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

      <label>
        Priority:{' '}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <br />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
