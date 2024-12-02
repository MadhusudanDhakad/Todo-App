const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req,res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = { id:uuidv4(), name:req.body.name };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req,res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(200).json({message: 'Task deleted successfully'});
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));