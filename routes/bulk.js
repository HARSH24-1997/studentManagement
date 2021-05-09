const router = require('express').Router();
const Student = require('../models/student.model');
const mongoose = require('mongoose')


router.route('/write').post((req, res) => {

    var tempName = ['Mavi', 'Jack', 'Tom', 'Slayer', "Tagg", "Jay", "Uttu", "Insst"];
    var tempSchool = ['DPS', 'DDPS', 'Ryan ', 'CCDPS', "Ingrahm", "High", "CSHP", "TechSchool"];
    var tempEmail = ['Mavi@gmail.com', 'Jack@gmail.com', 'Tom@gmail.com', 'Slayer@gmail.com', "Tagg@gmail.com", "Jay@gmail.com", "Uttu@gmail.com", "Insst@gmail.com"];
    var events = [];
    let i = 1;
    for(i ; i <= req.body.number ; i++ ){
        events.push(
            { insertOne : {document : {
                name: tempName[Math.floor(Math.random()*tempName.length)],
                school: tempSchool[Math.floor(Math.random()*tempName.length)], 
                class: Math.floor((Math.random() * 12) + 1),  
                age: Math.floor((Math.random() * 18) + 5), 
                rollNo: i, 
                email:  tempEmail[Math.floor(Math.random()*tempEmail.length)], 
                subjectMarks:[
                   {
                        subject:"science",
                        marks:Math.floor((Math.random() * 100) + 1), 
                    },{
                        subject:"maths",
                        marks:Math.floor((Math.random() * 100) + 1), 
                    },{
                        subject:"english",
                        marks:Math.floor((Math.random() * 100) + 1), 
                    },{
                        subject:"computer",
                        marks:Math.floor((Math.random() * 100) + 1), 
                    }
                ]
            }
    }})}
    Student.bulkWrite(
        events,
    { ordered : false })
    .then(result=>{
        console.log(result);
        res.send(result);
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router; 