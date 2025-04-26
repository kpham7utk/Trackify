import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [editForm, setEditForm] = useState({ title: '', description: '', dueDate: '', priority: 'Medium' });
  const [sortBy, setSortBy] = useState('dueDate' | 'createdAt' | 'priority');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:8080/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  };

  // Add new task handler
  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  // Toggle complete
  const handleToggleComplete = (task) => {
    const updated = { ...task, completed: !task.completed };
    axios.put(`http://localhost:8080/api/tasks/${task.id}`, updated)
      .then(res => {
        setTasks(prev => prev.map(t => t.id === task.id ? res.data : t));
      })
      .catch(err => console.error(err));
  };

  // Delete
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:8080/api/tasks/${taskId}`)
      .then(() => setTasks(prev => prev.filter(t => t.id !== taskId)))
      .catch(err => console.error(err));
  };

  // Begin edit
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    });
  };

  // Save edit
  const handleSaveEdit = (taskId) => {
    const original = tasks.find(t => t.id === taskId);
    const updated = { ...original, ...editForm };
    axios.put(`http://localhost:8080/api/tasks/${taskId}`, updated)
      .then(res => {
        setTasks(prev => prev.map(t => t.id === taskId ? res.data : t));
        setEditingTaskId(null);
      })
      .catch(err => console.error(err));
  };

  // Filtering
  const filtered = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'incomplete') return !t.completed;
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') {
      // define an order map
      const rank = { High: 3, Medium: 2, Low: 1 };
      const diff = rank[a.priority] - rank[b.priority];
      return sortOrder==='asc' ? diff : -diff;
    } else {
      const dateA = new Date(sortBy === 'dueDate' ? a.dueDate : a.createdAt);
      const dateB = new Date(sortBy === 'dueDate' ? b.dueDate : b.createdAt);
      return sortOrder==='asc' ? dateA - dateB : dateB - dateA;
    }
  });

  return (
    <div>
      
      {/* Add Task Form */}
      <AddTaskForm onTaskAdded={handleTaskAdded} />

      {/* Filters */}
      <div style={{ marginBottom: '1rem' }}>
        {['all','completed','incomplete'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: 8,
              fontWeight: filter===f?'bold':'normal',
              background: filter===f?'#007bff':'#f0f0f0',
              color: filter===f?'#fff':'#000',
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Sort Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Sort by:&nbsp;</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Created At</option>
          <option value="priority">Priority</option>
        </select>
        <button
          onClick={() => setSortOrder(o => o==='asc'?'desc':'asc')}
          style={{
            marginLeft: 8, padding: '4px 8px',
            border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'
          }}
        >
          {sortOrder === 'asc' ? '⬆ Asc' : '⬇ Desc'}
        </button>
      </div>

      {/* Task List */}
      {sorted.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sorted.map(task => (
            <li key={task.id} style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '1rem' 
              }}>

              {editingTaskId === task.id ? (
                /* EDIT MODE */
                <div>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Title"
                  /><br/>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description"
                  /><br/>
                  <input
                    type="datetime-local"
                    value={editForm.dueDate}
                    onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })}
                  /><br/>
                  <select
                    value={editForm.priority}
                    onChange={e => setEditForm({ ...editForm, priority: e.target.value })}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select><br/>
                  <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              ) : (
                /* READ MODE */
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  background: '#fff',
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.05)',
                  marginBottom: '8px'
                }}>
                  {/* Left side: checkbox + text */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                    />
                    <div style={{ marginLeft: '12px' }}>
                      <div style={{
                        fontWeight: 'bold',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        marginBottom: '4px'
                      }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '2px' }}>
                        {task.description}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '2px' }}>
                        {sortBy==='dueDate'
                          ? `Due: ${new Date(task.dueDate).toLocaleString()}`
                          : `Created: ${new Date(task.createdAt).toLocaleString()}`}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: task.priority === 'High' ? '#c00' : task.priority === 'Medium' ? '#c60' : '#090'
                      }}>
                        Priority: {task.priority}
                      </div>
                    </div>
                  </div>

                  {/* Right side: buttons */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '24px' }}>
                  <button
                    onClick={() => startEditing(task)}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      background: '#f0f0f0',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.target.style.backgroundColor = '#e0e0e0';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.backgroundColor = '#f0f0f0';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🖉
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid #f5c2c7',
                      borderRadius: '6px',
                      background: '#f8d7da',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.target.style.backgroundColor = '#f1b0b7';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.backgroundColor = '#f8d7da';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🗑️
                  </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
