// registerUser.js
// Brief: A simple Node.js script that sends a POST request to register a new user.

const axios = require('axios');

// Replace with your actual API endpoint
const API_URL = 'http://localhost:5000/auth/register';

// User data to register
const userData = {
  email: 'newuser@example.com',
  password: 'StrongPassword123',
  name: 'New User',
  address: '123 Example Street'
};

axios.post(API_URL, userData, {
  headers: { 'Content-Type': 'application/json' }
})
.then(response => {
  console.log('User registered successfully:', response.data);
})
.catch(error => {
  if (error.response) {
    console.error('Error response:', error.response.data);
  } else {
    console.error('Error message:', error.message);
  }
});
