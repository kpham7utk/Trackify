import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [editForm, setEditForm] = useState({ title: '', description: '', dueDate: '' });
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:8080/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
  
    axios.put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask)
      .then(response => {
        setTasks(prevTasks =>
          prevTasks.map(t => (t.id === task.id ? response.data : t))
        );
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    });
  };
  
  const handleSaveEdit = (taskId) => {
    const updatedTask = {
      ...tasks.find(t => t.id === taskId),
      ...editForm
    };
  
    axios.put(`http://localhost:8080/api/tasks/${taskId}`, updatedTask)
      .then(response => {
        setTasks(prev =>
          prev.map(t => (t.id === taskId ? response.data : t))
        );
        setEditingTaskId(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(sortBy === 'dueDate' ? a.dueDate : a.createdAt);
    const dateB = new Date(sortBy === 'dueDate' ? b.dueDate : b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div>
      <h1>Trackify</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <h2>Task List</h2>

      <div style={{ marginBottom: '1rem' }}>
        {['all', 'completed', 'incomplete'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: '0.5rem',
              fontWeight: filter === f ? 'bold' : 'normal',
              backgroundColor: filter === f ? '#007bff' : '#f0f0f0',
              color: filter === f ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Created At</option>
        </select>

        <button
          onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
          style={{
            marginLeft: '1rem',
            padding: '0.3rem 0.6rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {sortOrder === 'asc' ? '⬆️ Ascending' : '⬇️ Descending'}
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {sortedTasks.map(task => (
            <li key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  /><br />
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                  /><br />
                  <input
                    type="datetime-local"
                    value={editForm.dueDate}
                    onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })}
                  /><br />
                  <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                  />
                  <div>
                    <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.title}
                    </strong> — {task.description}
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {sortBy === 'dueDate'
                        ? `Due: ${new Date(task.dueDate).toLocaleString()}`
                        : `Created: ${new Date(task.createdAt).toLocaleString()}`}
                    </div>
                  </div>
                  <span style={{ marginLeft: '1rem' }}>
                    <button onClick={() => startEditing(task)} style={{ marginRight: '0.5rem' }}>
                      🖉 Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      🗑️ Delete
                    </button>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
