const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Diagnose = require('../models/diagnose');
const { body, validationResult } = require('express-validator'); // Updated import
const patient = require('../models/patient');
// Hypothetical validation rules for the signup route
exports.validateSignup = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').not().isEmpty().withMessage('Role is required'),
    // Add any additional validation rules here
];

// Handle user signup
exports.signup = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }

    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await user.save(); // Save user and then check role

        if (role === 'doctor') {
            const newDoctor = new Doctor({
                name: savedUser.name,
                email: savedUser.email,
            });
            await newDoctor.save();
        } else {
            const diagnose = new Diagnose({ patientId: savedUser._id });
            await diagnose.save();

        }

        res.status(201).json({ message: 'User created', userId: savedUser._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.signupPatient = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }

    const { name, email, password, dateOfBirth,weight,height,bloodType,oxygenLevel,heartRate,hand,smartWatch,gender } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'patient'  
        });

        const savedUser = await user.save(); // Save user and then check role

        const diagnose = new Diagnose({ patientId: savedUser._id });
        const patient = new patient({
            _id: savedUser._id,
            dateOfBirth,
            weight,
            height,
            bloodType,
            oxygenLevel,
            heartRate,
            hand,
            smartWatch,
            gender
        })
        await diagnose.save();

        res.status(201).json({ message: 'User created', userId: savedUser._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


//Handle user login
exports.login = (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    let loadedUser;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                res.status(404).json({ message: 'A user with this email could not be found.' });
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                console.log("not successful");
                const error = new Error('Wrong password');
                res.status(401).json({ message: 'Wrong password or email' });
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                name: loadedUser.name,
                role: loadedUser.role,
                id: loadedUser._id.toString()
            },
                'somesupersecretsecret',
                { expiresIn: '1y' }
            );
            console.log("successful");
            res.status(200).json({ token, name: loadedUser.name, userId: loadedUser._id.toString(),role: loadedUser.role });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};