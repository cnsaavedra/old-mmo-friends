const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000;

const db = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password:   '123456',
    database:   'mysql'
})

db.connect((err) =>{
    if(err){
        console.log('error in connection')
    }
    console.log('MySql Connected')
})

// Creating Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE mysql';
    db.query(sql, (err, result) => {
        if(err){
            console.log('error in connection')
        }
        console.log(result)
        res.send('database created')
    })
})

// Create table
app.get('/createnames', (req, res) => {
    let sql = 'CREATE TABLE names(id int AUTO_INCREMENT, nameTo VARCHAR(255), game VARCHAR(255), nameFrom VARCHAR(255), PRIMARY KEY(id))';

    db.query(sql, (err, result) =>{
        if(err){
            console.log('error in connection')
            res.send('Created table')
        }
    })
})


// Get names from table
app.get('/getnames', (req, res) => {
    let sql = 'SELECT * FROM names'
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log('error in getting * names')
        }
        res.send('* names got')
    })
})

// Select a name from table
app.get('/getnames/:nameTo', (req, res) => {
    let sql = 'SELECT * FROM names WHERE nameTo = ${req.params.nameTo}'
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log('error in getting singular name')
        }
        console.log(results)
        res.send('singular nameTo got')
    })
})

// Add name to tableTODO
app.get('/addname', (req, res) => {
    let post = {nameTo:''}
    let sql = 'CREATE TABLE names(id int AUTO_INCREMENT, nameTo VARCHAR(255), game VARCHAR(255), nameFrom VARCHAR(255), PRIMARY KEY(id))';

    db.query(sql, (err, result) =>{
        if(err){
            console.log('error in connection')
            res.send('Created table')
        }
    })
})


app.listen(port, () => {
    console.log('Server is listening on Port: ${port}');
});