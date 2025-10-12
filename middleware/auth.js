const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith('Bearer')) {
        return res.status(401).json({ success: false, message: 'Unauthorized: No token Provided' })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWR_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}

module.exports = verifyToken;