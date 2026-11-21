const express = require('express');
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.send('Hello!');
});
 
 
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  
  if (username === 'admin' && password === 'password') {
    res.status(200).json({
      message: 'Login successful!'
    });
  } else {
    res.status(401).json({
      message: 'Invalid credential'
    });
  }
});
 
app.post('/greetings', (req, res) => {
  const { name, course, section } = req.body || {};
 
  res.status(200).json({
    name: name,
    course: course,
    section: section,
    messages: `Hello, ${name} from ${course} section ${section}!`
  });
});
 
 
app.listen(8000, error => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:8000`);
  } 
});