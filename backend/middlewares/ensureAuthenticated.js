const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, JWT token is required' });
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized, JWT token is invalid or expired' });
    }
    
};

module.exports = ensureAuthenticated;
