var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var hbs = require('hbs');
const app = express();
var dateFormat = require('dateformat');

/* GET home page. */
router.get('/', function (req, res, next) {
  
  var html = '<table>';
  html += '<th>First Name</th><th>Last Name</th><th>Department</th><th>Start Date</th><th>Job Title</th><th>Salary</th>'
  Employee.find(function (err, employees) {
    for (var employee in employees) {
      html += '<form method="GET">';
      html += '<tr><td>';
      html += employees[employee].get("firstName");
      html += "</td><td>";
      html += employees[employee].get("lastName");
      html += "</td><td>";
      html += employees[employee].get("department");
      html += "</td><td>";
      html += employees[employee].get("startDate");
      html += "</td><td>";
      html += employees[employee].get("jobTitle");
      html += "</td><td>";
      html += employees[employee].get("salary");
      html += "</td><td>";
      html += '<input type="hidden" name="id" value="' + employees[employee].get("_id") + '" />';
      html += '<input type="submit" value="Update" formaction="update">'
      html += '<input type="submit" value="Delete" formaction="delete">'
      html += '</form>'
      html += "</td><td></tr>";;
    }
    html += "</table>";
  }).then(function() {
    if(req.query.dsuccess == 'true'){
      res.render('index', {
        title: 'Employee List', dsuccess: 'Delete Succeeded!'
      })
    } else {
      res.render('index', {
        title: 'Employee List'
      })
    }
    
  })

 

  hbs.registerHelper('empList', function () {
    return html;
  })
});

router.get('/update', function (req, res, next) {

  console.log("update - req.query: " + req.query.id);
  
  var id = req.query.id;

  Employee.findById(id, function (err, employee) {
    console.log(employee)
    console.log();

    var date = dateFormat(employee.startDate, "yyyy-mm-dd")
    
    res.render('update', {
      title: 'Update Person',
      id:employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      department: employee.department,
      startDate: date,
      jobTitle: employee.jobTitle,
      salary: employee.salary
    })


  })


  

})

router.get('/sendupdate', function (req, res, next) {
  res.render('index', {
    title: 'Update Person'
  })
  console.log("sendupdate - req.query: " + req.query.id);
  var id = req.query.id;

  Employee.findById(id, function (err, employee) {
    
    employee.firstName = req.query.firstName;
    employee.lastName = req.query.lastName;
    employee.department = req.query.department;
    employee.startDate = req.query.startDate;
    employee.jobTitle= req.query.jobTitle;
    employee.salary = req.query.salary;
    employee.save();
    
  }).then(function(){
    res.redirect('/');
  })
  
})

router.get('/delete', function (req, res, next) {
  res.render('index', {
    title: 'Delete Person'
  })
  console.log(req.body.id);
  var id = req.param('id');

  Employee.findByIdAndRemove(id, function () {}).then(function(){
    res.redirect('/?dsuccess=true');
  })

  
})





router.get('/create', function (req, res, next) {
  res.render('index', {
    title: 'Create Person'
  });
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var department = req.query.department;
  var startDate = req.query.startDate;
  var jobTitle = req.query.jobTitle;
  var salary = req.query.salary;

  create(firstName, lastName, department, startDate, jobTitle, salary);

  res.redirect('/');
});

mongoose.connect('mongodb://localhost/MongooseCRUD', {
  useNewUrlParser: true
});




var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

  newEmployee.save(function (err) {
    if (err) throw err;

    console.log('User created!');

  });
}

module.exports = router;