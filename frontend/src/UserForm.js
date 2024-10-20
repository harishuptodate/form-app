// frontend/src/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css'; // Ensure you have this import for styling

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        photo: null,
        resume: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('mobile', formData.mobile);
        data.append('photo', formData.photo);
        data.append('resume', formData.resume);

        try {
            const response = await axios.post('http://localhost:5000/api/users', data);
            console.log('User created:', response.data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
            
            <label htmlFor="photo">Upload Photo:</label>
            <input type="file" name="photo" id="photo" onChange={handleChange} required />
            
            <label htmlFor="resume">Upload Resume:</label>
            <input type="file" name="resume" id="resume" onChange={handleChange} required />
            
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
