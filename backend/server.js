// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// File storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Mongoose Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    photo: String,
    resume: String
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/users', upload.fields([{ name: 'photo' }, { name: 'resume' }]), async (req, res) => {
    const { name, email, mobile } = req.body;
    const photo = req.files['photo'][0].path;
    const resume = req.files['resume'][0].path;

    const newUser = new User({ name, email, mobile, photo, resume });
    await newUser.save();
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
