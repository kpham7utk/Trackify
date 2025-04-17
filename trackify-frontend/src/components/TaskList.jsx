import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks', {
      auth: {
        username: 'user', // default Spring Security username
        password: '8076de5f-a2db-4419-8f84-94180ff0b9b9' // replace this!
      }
    })
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
