const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized to access this route"
        });
    }

    try {
        const secret = process.env.SECRET_KEY || "secret_key";
        const decoded = jwt.verify(token, secret);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                message: "No user found with this id"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized to access this route"
        });
    }
};

// allowedRoles = []
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            })
        }

        return next()
    }
}

module.exports = {
    protect,
    authorize
}