// -- EVENTS --
//
// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', (args) => {
//     console.log(args);
// });
//
// eventEmitter.emit('click', {name: 'Ivan', age: 25});
// eventEmitter.emit('click', {name: 'Ivan', age: 25});
// eventEmitter.emit('click', {name: 'Ivan', age: 25});
// eventEmitter.emit('click', {name: 'Ivan', age: 25});
//
// eventEmitter.once('doubleClick', (data) => {
//     console.log(data);
//     console.log('I was born to die');
// });
//
// console.log(eventEmitter.eventNames());
//
// eventEmitter.emit('doubleClick', {function: 'DEATH'});
// eventEmitter.emit('doubleClick', {function: 'DEATH'});
// eventEmitter.emit('doubleClick', {function: 'DEATH'});
//
// console.log(eventEmitter.eventNames());

// -- STREAMS --
// //
// // -- TYPES OF STREAMS: read, write, duplex, transform --
// //
// const fs = require('node:fs');
// const path = require('node:path');
//
// const readStream = fs.createReadStream(path.join('dir', 'file5.txt'), {encoding:'utf-8'}, );
// const writeStream = fs.createWriteStream(path.join('dir', 'file3.txt'));
//
// // readStream.on('data', (chunk) => {
// //     writeStream.write(chunk);
// // });
//
// const handleError = () => {
//     console.error('ERROR');
//     readStream.destroy();
//     writeStream.end('Error while reading file....');
// };
//
// readStream
//     .on('error', handleError)
//     .pipe(writeStream);

// -- EXPRESS --
//
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 4400;

app.get('/welcome', (req, res) => {
    res.send('WELCOME');
});

const users = [
    {
        name: 'Jack',
        age: 45,
        gender: 'male'
    },
    {
        name: 'Elli',
        age: 18,
        gender: 'female'
    },
    {
        name: 'Rick',
        age: 25,
        gender: 'male'
    },
    {
        name: 'Mag',
        age: 30,
        gender: 'female'
    }
];
app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:userId', (req, res) => {

    const {userId} = req.params;
    const user = users[+userId - 1];

    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({
        message: 'User was successful created!'
    });
});

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const user = req.body;

    users[userId] = user;

    res.status(200).json({
        message: 'User was created',
        data: user
    })
});

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message: 'User was deleted'
    })
});

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT} )`);
});
