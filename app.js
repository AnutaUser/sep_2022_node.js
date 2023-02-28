const fs = require('fs');
const path = require('path');
const os = require('os');

// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());

// console.log(os.cpus());
// console.log(os.cpus().length);
// console.log(os.arch());

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });

// fs.writeFile(path.join(__dirname, 'main', 'file.js'), 'message from me', (err) => {
//     if (err) {
//         throw  new Error(err.message);
//     }
// });

// fs.appendFile(path.join(__dirname, 'main', 'file.txt'), '\nI am from Ukraine!', err => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });

// fs.truncate(path.join(__dirname, 'main', 'file.js'), err => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });

// fs.mkdir(path.join(__dirname, 'main', 'users'), err => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });

const users = [
    {
        name: 'Anton',
        age: 25,
        status: true
    },
    {
        name: 'Oleg',
        age: 56,
        status: false
    },
    {
        name: 'Ira',
        age: 17,
        status: true
    },
    {
        name: 'Olga',
        age: 32,
        status: false
    }
];

const array = ['Lina', 'Kamila', 'Ostap'];

// fs.rmdir(path.join(__dirname, 'main', 'users', 'user.name'), err => {
//     if (err) {
//         throw new Error(err.message);
//     }
// });

// users.forEach(user => fs.writeFile(
//     path.join(__dirname, 'main', 'usersFromArray', `${user.name}.js`),
//     `const user = {name: ${user.name}, age: ${user.age}, status: ${user.status}}`,
//     err => {
//         if (err) {
//             throw new Error(err.message);
//         }
//     }));

// users.forEach(user => fs.rename(
//     path.join(__dirname, 'main', 'users', `${user.name}.txt`), path.join(__dirname, 'main', 'usersFromArray', `${user.name}.js`), err => {
//         if (err) {
//             console.log(err);
//         }
//     }));

const {jsFunc} = require('./main/file');

