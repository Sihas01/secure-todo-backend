const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../util/utils.js');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Provide required fields" });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = generateToken(user._id);
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ success: true, data: userWithoutPassword, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Provide all fields" });
    }

    try {
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(409).json({ success: false, message: "User already exists" });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...req.body, password: hashPassword });

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.error("Error message:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
