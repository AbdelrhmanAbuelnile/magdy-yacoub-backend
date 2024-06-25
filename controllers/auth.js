/**

auth.js
This file contains the authentication controller functions for the API application.
It includes the signup and login functions.
*/

// Import required modules
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');

const {
    validationResult, Result
} = require('express-validator');

const User = require('../models/user');
const Diagnose = require('../models/diagnose');


//Handle user signup
exports.signup = (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error =  new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;
    const sex = req.body.sex;
    const height = req.body.height;
    const weight = req.body.weight;
    const geneticDiabetes = req.body.geneticDiabetes;
    const geneticHeartDiseases = req.body.geneticHeartDiseases;
    const smoker = req.body.smoker;

    bcrypt.hash(password, 10)
    .then(hashedPassword => {
        const user = new User({
            name,
            email,
            password: hashedPassword,
            age,
            sex,
            height,
            weight,
            geneticDiabetes,
            geneticHeartDiseases,
            smoker
        });
        return user.save();
    })
    .then(result => {
        const diagnose = new Diagnose({userId: result._id});
        return diagnose.save()
    })
    .then(result =>{
        res.status(201).json({message: 'User created.', userId: result.userId});

    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};


//Handle user login
exports.login = (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    let loadedUser;
    User.findOne({email}) 
    .then(user => {
        if(!user){
            const error =  new Error('A user with this email could not be found.');
            res.statusCode = 404; //User not found
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            console.log("not successful");
            const error =  new Error('Wrong password');
            res.statusCode = 401; 
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            name: loadedUser.name,
            id: loadedUser._id.toString()
        },
        'somesupersecretsecret',
        { expiresIn: '1y' }
        );
        console.log("successful");
        res.status(200).json({token, name: loadedUser.name, userId: loadedUser._id.toString() });
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};