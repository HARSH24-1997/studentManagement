var express = require('express');
var mongoose = require('mongoose');
const cors = require('cors');
let Student = require('./models/student.model');
const reportsRouter = require('./routes/reports');
const searchRouter = require('./routes/search');
const bulkRouter = require('./routes/bulk');


var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/create', function (req, res) {
  Student.findOne({rollNo: req.body.rollNo ,class: req.body.class })
  .then(student => {
      if (student !== null) {
          res.json('User Already Exit');
      }
      else {
          const { name, school, age, rollNo, email, marks } = req.body;
          const newStudent = new Student({  name, school, class: req.body.class , age, rollNo, email, subjectMarks:marks });
          console.log(newStudent,marks)
          newStudent.save()
              .then( (student) => {
                  console.log("Data is added sucesfully");
                  console.log(student);
                  res.send("Data Added");
              })
      }
  })
});

app.use('/reports', reportsRouter);
app.use('/search', searchRouter);
app.use('/bulk', bulkRouter);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var mongoDB = 'mongodb://127.0.0.1/studentManagement';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));