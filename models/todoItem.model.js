const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter title"]
    },

    description: {
        type: String,
        required: [true, "Please enter a description"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
}
);

const ToDoItem = mongoose.model('ToDoItem', ToDoSchema);

module.exports = ToDoItem;