const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY || "secret_key";

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required" 
            });
        }
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "email is not registered, please register"
            });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already registered with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

module.exports = {
    login,
    register
};