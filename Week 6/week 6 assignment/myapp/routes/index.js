var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var hbs = require('hbs');
const app = express();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
  var html = '<div>'
  /*
  var employees = Employee.find({}, function (err, employees) {
    return employees;
  })
  */
  Employee.find(function (err, employees) {
    //return JSON.stringify(employees);


    //console.log(employees)


    for (var employee in employees) {
      //html += '<form method="POST" id="' + employees[employee].get("_id") +'">'
      html += '<form method="POST">';
      html += employees[employee].get("firstName");
      html += "<br/>";
      html += employees[employee].get("lastName");
      html += "<br/>";
      html += employees[employee].get("department");
      html += "<br/>";
      html += employees[employee].get("startDate");
      html += "<br/>";
      html += employees[employee].get("jobTitle");
      html += "<br/>";
      html += employees[employee].get("salary");
      html += "<br/>";
      html += '<input type="hidden" name="id" value="' + employees[employee].get("_id") + '" />';
      html += '<input type="submit" value="Update" formaction="update">'
      html += '<input type="submit" value="Delete" formaction="delete">'
      html += '</form>'
      html += "<br/><br/>";
    }
    html += "</div>";
    //res.write(html);
  });

  hbs.registerHelper('empList', function () {
    return html;
  })
});

router.post('/update', function (req, res, next) {
  res.render('index', {
    title: 'Update Person'
  })
  console.log(req.body.id);
  var id = req.param('id');

  Employee.findById(id, function (err, employees) {
  console.log(employees)
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

});

mongoose.connect('mongodb://localhost/MongooseCRUD', {
  useNewUrlParser: true
});



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

  newEmployee.save(function (err) {
    if (err) throw err;

    console.log('User created!');

  });
}


/*
hbs.registerHelper('empList', function () {
  
})
*/

module.exports = router;