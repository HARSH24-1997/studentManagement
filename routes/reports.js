const router = require('express').Router();
const Student = require('../models/student.model');
const mongoose = require('mongoose')


router.route('/totalMarks').post((req, res) => {
    // db.students.aggregate([{"$unwind":"$subjectMarks"},{"$project":{"class":1,"subject":"$subjectMarks.subject","marks":"$subjectMarks.marks"}},{"$group":{"_id":{"subject":"$subject"},"TotalMarks":{"$sum":"$marks"}}}]).pretty()  
    console.log(req.body.class, req.body.subject);
    var classMatch = req.body.class
    Student.aggregate(([
        {
            $unwind: "$subjectMarks"
        },
        {
            $project: {
                class: 1,
                subject: "$subjectMarks.subject",
                marks: "$subjectMarks.marks"
            }
        },
        {
            $match: {
                $and: [{ class: parseInt(classMatch) }, { subject: req.body.subject }]
            }
        },
        {
            $group: {
                _id: {
                    subject: "$subject"
                },
                TotalMarks: {
                    $sum: "$marks"
                },
                Count: {
                    $sum: 1
                },
                Average: {
                    $avg: "$marks"
                }
            }
        }
    ]))
        .then(result => {
            res.send(result);
            console.log(result);
            console.log("dfdff")
        })
        .catch(err => {
            console.log(err);
            console.log(err)
        })
});

router.route('/subjectTopper').post((req, res) => {
    // db.students.aggregate([{"$unwind":"$subjectMarks"},{"$project":{"class":1,"subject":"$subjectMarks.subject","marks":"$subjectMarks.marks"}},{"$group":{"_id":{"subject":"$subject"},"TotalMarks":{"$sum":"$marks"}}}]).pretty()  
    console.log(req.body.class, req.body.subject, 'efffdf');
    var classMatch = req.body.class
    Student.aggregate(([
        {
            $unwind: "$subjectMarks"
        },
        {
            $project: {
                class: 1,
                subject: "$subjectMarks.subject",
                marks: "$subjectMarks.marks",
                name: "$name"
            }
        },
        {
            $match: {
                $and: [{ class: parseInt(classMatch) }, { subject: req.body.subject }]
            }
        },
        {
            $sort: { marks: -1 }
        },
        {
            $limit: 1
        }
    ]))
        .then(result => {
            res.send(result);
            console.log("dfdfdf")
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
});

router.route('/rank').post((req, res) => {
    // db.students.aggregate([{"$match":{"class":3}},{"$group":{"_id":{"name":"$name","Totalmarks":{"$sum":"$subjectMarks.marks"}}}},{"$sort":{"_id.Totalmarks":-1}}]).pretty()
    // console.log(req.body.class, req.body.subject, 'efffdf');
    // var classMatch = req.params.class
    // console.log(classMatch,"dfffd")
    var arr = [];
    var check = Student.aggregate([
        {
            $match: {
                class: req.body.class
            }
        },
        {
            $group: {
                _id: {
                    name: "$name",
                    Totalmarks: {
                        $sum: "$subjectMarks.marks"
                    }
                }
            }
        },
        {
            $sort: {
                "_id.Totalmarks": -1
            }
        }
    ]).cursor(
            {
                batchSize: 0
            }
        ).allowDiskUse(
            true
        ).exec();
    
check.on("data", (chunk) => {
    arr.push(chunk);
})
check.on("end", () => {
    res.send(arr);
    console.log(arr);
})
});

module.exports = router;