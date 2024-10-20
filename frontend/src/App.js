import logo from './logo.svg';
import './App.css';

// frontend/src/App.js
import React from 'react';
import UserForm from './UserForm';

const App = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '10%' }}>User Registration</h1>
            <UserForm />
        </div>
    );
};

export default App;
