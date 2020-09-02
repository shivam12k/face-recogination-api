const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
const App = express();

const database = {
    users: [
        {
            id: '123',
            name: 'shivam',
            email: 'shivam@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '122',
            name: 'jhon',
            email: 'jhon@gmail.com',
            password: 'pass',
            entries: 0,
            joined: new Date()
        },
    ]
    // , login: [
    //     {
    //         id: '324',
    //         hash: '',
    //         email: 'shivam@gmail.com'
    //     }
    // ]
}
App.get('/', (req, res) => {
    res.send(database.users);
})
App.use(bodyParser.json());

App.use(cors())


App.post('/signin', (req, res) => {

    // // Load hash from your password DB.
    // bcrypt.compare("bacon", hash, function (err, res) {
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function (err, res) {
    //     // res = false
    // });
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success');
    }
    else {
        res.status(400).json('error loggimg in')
    }
})

App.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // bcrypt.hash("bacon", null, null, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });

    database.users.push({
        id: '121',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1])
})

App.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            return res.json(users);
        }

    })
    if (!found) {
        res.status(400).json('not found');
    }
})

App.post('/image', (req, res) => {
    const { id } = req.body;
    found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            users.entries++
            return res.json(users.entries);

        }

    })
    if (!found) {
        res.status(400).json('not found');
    }
})





App.listen(3000, () => {
    console.log('app is running on port 3000');
});