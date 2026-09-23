const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required" 
        });
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser ){
        return res.status(400).json({
            "message": "email is not registered,please regiter"
        })
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password)

    if (!checkPassword) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign()

    
    res.status(200).json({
        message: "Login successful",
    })
}

async function register(req, res) {
}