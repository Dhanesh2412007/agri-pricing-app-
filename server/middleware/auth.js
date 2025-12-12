const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware factory function to check JWT and user role
const protect = (requiredRole) => async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('role');

            // Enforce role check for partner-only routes
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ message: `Forbidden: Only ${requiredRole} can access.` });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token.' });
    }
};

module.exports = protect;
