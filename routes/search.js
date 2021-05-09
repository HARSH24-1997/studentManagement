const router = require('express').Router();
const Student = require('../models/student.model');
const mongoose = require('mongoose')


router.route('/').post((req, res) => {
    console.log(req.body, "dffdf")
    Student.find({ rollNo: { $in: req.body.rollNos } }).exec()
    .then(students => {
        res.send(students);
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router; 