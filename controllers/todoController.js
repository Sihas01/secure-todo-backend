const ToDoItem = require('../models/todoItem.model');

exports.getTodos = async (req, res) => {
    try {
        const todos = await ToDoItem.find({ userId: req.user.id });
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newToDoItem = await ToDoItem.create({ title, description, userId: req.user.id });
        res.status(201).json({ success: true, data: newToDoItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
