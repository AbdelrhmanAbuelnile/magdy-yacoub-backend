/**
 * log.js
 *
 * This file contains the controller functions for log-related operations.
 * It includes functions for fetching all logs, fetching user-specific logs, creating a new log.
 */

// Import required modules
const Log = require('../models/log');
const User = require('../models/user');


// Get all logs
exports.getAiLogs = (req, res, next) => {
    Log.find()
    .then(logs => {
        if(!logs){
            const error = new Error('Could not find logs.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'logs fetched.', logs});
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// Get user-specific logs
exports.getLogs = (req, res, next) => {
    const userId= req.userId;
    Log.find({userId})
    .then(logs => {
        if(!logs){
            const error = new Error('Could not find logs.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'logs fetched.', logs});
    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.getAvgLogs = (req, res, next) => {
    const userId= req.userId;
    let avgHR=0, avgHRV=0, avgSBP=0, avgDBP=0, avgRR=0, avgSpO2=0, avgTemp=0;
    let sumHR=0, sumHRV=0, sumSBP=0, sumDBP=0, sumRR=0, sumSpO2=0, sumTemp=0;
    
    Log.find({userId})
    .then(logs => {
        if(!logs){
            res.status(200).json({message: 'logs not found.', average: {avgHR, avgHRV, avgSBP, avgDBP, avgRR, avgSpO2, avgTemp}});
        }
        //res.status(200).json({message: 'logs fetched.', logs});
        console.log(sumSBP);
        const length = logs.length;
        for (let i = 0; i < length; i++) {
            sumHR +=logs[i].HR || 80;
            sumHRV +=logs[i].HRV || 80;
            sumSBP +=logs[i].systolic_BP || 120;
            sumDBP +=logs[i].diastolic_BP || 80;
            sumRR +=logs[i].RR || 15;
            sumSpO2 +=logs[i].SpO2 || 97;
            sumTemp +=logs[i].temperature || 37;
          }
          console.log(sumSBP);
           avgHR =  Math.floor(sumHR / length);
           avgHRV = Math.floor(sumHRV / length);
           avgSBP = Math.floor(sumSBP / length);
           avgDBP = Math.floor(sumDBP / length);
           avgRR = Math.floor(sumRR / length);
           avgSpO2 = Math.floor(sumSpO2 / length);
           avgTemp = Math.floor(sumTemp / length);
           console.log(avgSBP);
            res.status(200).json({message: 'logs fetched.', average: {avgHR, avgHRV, avgSBP, avgDBP, avgRR, avgSpO2, avgTemp}});

    })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

// Create a new log
exports.postLog = (req, res, next) => {
    const userId = req.userId;
    const { 
        heartRate, 
        systolicBloodPressure, 
        diastolicBloodPressure,
        heartRateVariability, 
        saturationPerOxygen,
        temperature,
        respirationRate,
        faint,
        sleep
    } = req.body

    let name, age, sex, height, weight, geneticDiabetes, geneticHeartDiseases, HR, HRV, systolic_BP, diastolic_BP, RR, SpO2, smoker;
    let log;

    User
    .findById(userId)
    .then(user =>{
        if(!user){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        name= user.name;
        age = user.age;
        if(user.sex == 'male'){sex = 1}else{sex=0};
        height = user.height;
        weight = user.weight;
        if(user.geneticDiabetes){geneticDiabetes=1}else{geneticDiabetes=0};
        if(user.geneticHeartDiseases){geneticHeartDiseases=1}else{geneticHeartDiseases=0};
        if(user.smoker){smoker=1}else{smoker=0};
        HR = heartRate;
        HRV = heartRateVariability;
        systolic_BP = systolicBloodPressure;
        diastolic_BP = diastolicBloodPressure;
        RR = respirationRate;
        SpO2 = saturationPerOxygen;
        log = new Log({
            userId,
            name,
            age, 
            sex, 
            height, 
            weight, 
            geneticDiabetes, 
            geneticHeartDiseases, 
            HR, 
            HRV, 
            systolic_BP, 
            diastolic_BP, 
            RR, 
            SpO2,
            temperature,
            faint,
            sleep,
            smoker,
        });
        return log.save()
    })
    .then(result =>{
        res.status(201).json({
            message: 'created successfully',
            log
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};




