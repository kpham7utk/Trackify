import React from 'react';
import TaskList from './components/TaskList';
import './styles/Trackify.css';


function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trackify</h1>
      <TaskList />
    </div>
  );
}

export default App;