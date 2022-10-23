const express = require('express');

const book =express();

const bodyParser = require('body-parser');

const cors =require('cors');

const sequelize = require('./util/database');

const product = require('./model/head')

const userRouter = require('./route/tail')

book.use(bodyParser.json())

book.use(cors())

book.use(userRouter)

sequelize
.sync()
.then(result =>{
    // console.log(result);
    book.listen(3000);
})
.catch(err =>{
    console.log(err);
})