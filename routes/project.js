/**

project.js
This file defines the project routes for the API application using Express.js.
Authentication and authorization middleware isAuth are applied to specific routes.
*/

// Import required modules
const express = require('express');

const logController = require('../controllers/log');
const diagnoseController = require('../controllers/diagnose');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


// Logs routes

// logs for all users
router.get('/ai/logs', logController.getAiLogs);

// logs for app logged in user
router.get('/logs',isAuth, logController.getLogs);

// avg logs for app registed user
router.get('/avgLogs',isAuth, logController.getAvgLogs);

// create log by app
router.post('/logs', isAuth, logController.postLog);

// setting diagnose
router.put('/ai/diagnose', diagnoseController.putDiagnose);

// for web
router.get('/diagnose/:userId', diagnoseController.getDiagnose)

// for app
router.get('/diagnose',isAuth, diagnoseController.getAuthDiagnose)

// get all users diagnose
router.get('/diagnoses', diagnoseController.getAllDiagnose)

module.exports = router;