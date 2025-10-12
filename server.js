const express = require('express')
const app = express()
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));
const port = 3000;

app.post('/api/login', async (req, res) => {
    const user = req.body;
    if (!user.email || !user.password) {
        return res.status(400).json({ success: false, message: "Provide required fields" })
    }

    try {
        const isUser = await User.findOne({ email: user.email }).select('+password');
        if (!isUser) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(user.password, isUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        const { password, ...userWithoutPassword } = isUser.toObject();
        return res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
})

app.post('/api/register', async (req, res) => {
    const user = req.body;
    if (!user.email || !user.password) {
        return res.status(400).json({ sucess: false, message: "provide all fields" })
    }

    try {
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
            return res.status(409).json({ success: false, message: "User already exist" })
        }

        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;

        const newUser = await User.create(user);
        const { password, ...userWithoutPassword } = newUser.toObject();
        res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.log("error message: ", error.message)
        res.status(500).json({ success: false, message: "server error" });
    }
})


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(() => {
    console.log("database connected");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}).catch((error) => console.log(error))