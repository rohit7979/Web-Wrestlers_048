// import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../Models/Loginmodel.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
    console.log("hi am register")
    try {
        const { student_name, student_email, student_password } = req.body;
        console.log(req.body);
        if (!student_name || !student_email || !student_password) {
            return res.status(400).send('Invalid request data');
        }
        const userExist = await Customer.findOne({ student_email });
        if (!userExist) {
            const data = new Customer({ student_name, student_email, student_password,  total_amout:0});
            await data.save();
            res.status(201).json({ msg: "Register successful", data });
        } else {
            res.status(400).send('User already exists, try to login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const allUsers = async (req, res) => {
    try {
        const users = await Customer.find();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("There is an error in fetching users");
    }
};

export const login = async (req, res) => {
    try {
        const { student_email, student_password } = req.body;
        if (!student_email || !student_password) {
            return res.status(400).send("Email and password required");
        }
        const userExist = await Customer.findOne({ student_email });
        if (userExist) {
            const passCheck = await bcrypt.compare(student_password, userExist.student_password);
            if (passCheck) {
                const accessToken = generateToken(userExist._id);
                const refreshToken = generateRefreshToken(userExist._id);
                userExist.refreshToken = refreshToken;
                await userExist.save();
                res.status(200).json({ accessToken, refreshToken });
            } else {
                res.status(400).send("Incorrect password");
            }
        } else {
            res.status(400).send('User does not exist, try to register');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const token = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await Customer.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });
        const accessToken = generateToken(user._id);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token refresh failed', error });
    }
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const user = await Customer.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'User logout failed', error });
    }
};
