const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const path = require('path');
const userData = require('./user.json');

// Middleware to parse JSON body
app.use(bodyParser.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// I Added home path as default
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  res.status(200).json(userData); 
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // I  check if the username matches
  if (username === userData.username) {
    // I check if the password matches her
    if (password === userData.password) {
      res.status(200).json({
        status: true,
        message: 'User is valid'
      });
    } else {
      res.status(401).json({
        status: false,
        message: 'Password is invalid'
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: 'Username is invalid'
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username;

  if (username) {
    res.status(200).send(`<b>${username} successfully logged out.</b>`);
  } else {
    res.status(400).send('Username is required for logout.');
  }
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

app.use('/', router);

const port = process.env.port || 8081;
app.listen(port, () => {
  console.log('Web Server is listening at port ' + port);
});
