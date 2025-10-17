const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
const port = 3000;

const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');


app.use('/api',authRoutes);
app.use('/api/todos',todoRoutes);

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}).catch((error) => console.log(error))