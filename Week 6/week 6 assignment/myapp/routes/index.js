var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var hbs = require('hbs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  allEmployees();
});

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var department = req.query.department;
  var startDate = req.query.startDate;
  var jobTitle = req.query.jobTitle;
  var salary = req.query.salary;

  create(firstName, lastName, department, startDate, jobTitle, salary);

});

mongoose.connect('mongodb://localhost/MongooseCRUD', { useNewUrlParser: true });



// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  department: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  jobTitle: String,
  salary: Number
});


var Employee = mongoose.model('Employee', employeeSchema);

function create(vfirstName, vlastName, vdepartment, vstartDate, vjobTitle, vsalary) {
  var newEmployee = Employee({
    firstName: vfirstName,
    lastName: vlastName,
    department: vdepartment,
    startDate: vstartDate,
    jobTitle: vjobTitle,
    salary: vsalary
  });

  newEmployee.save(function(err) {
    if (err) throw err;
  
    console.log('User created!');

  });
}


function allEmployees(){
Employee.find({}, function(err, employees) {
  if (err) throw err;

  // object of all the users

  return employees
});
}

hbs.registerHelper('empList', function() {
  console.log(allEmployees);
  list = allEmployees();
return list;
})


module.exports = router;
