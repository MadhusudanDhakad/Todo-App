import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/tasks', { name:task });
        setTasks([...tasks, response.data]);
        setTask('');
      }
      catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch(error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem' }}>
      <h1>To-Do Application</h1>
      <form onSubmit={addTask}>
        <input 
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Enter a new task'
          style={ { padding: '10px' } }
        />
        <button type='submit'  style={ { padding: '10px' } }>
          Add Task
        </button>
      </form>
      <ol>
        {tasks.map((t) => (
          <li key={t.id} style={ { fontSize: '1.2rem'}}>
            {t.name}
            <button onClick={() => removeTask(t.id)} style={ { marginLeft: '10px', padding: '5px' } }>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;