import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h1>Trackify</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
              />
              <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </strong> — {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
