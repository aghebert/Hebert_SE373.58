var express = require('express');
var router = express.Router();
var hbs = require('hbs');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/grid', function(req, res, next) {
  res.render('grid', { title: 'Grid' });
});

router.get('/error', function(req, res, next) {
  res.render('error', { title:'Not Found'});
});

function rando() {
  return Math.round(Math.random() * 4 + 1);
}

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomClass(){
var classString = "";
  var ranThree = randomIntFromInterval(1,3);

  switch(ranThree){
    case 1:
classString = "still"
    break;
    case 2:
classString = "rotate"
    break;
    case 3:
classString = "shrink"
    break;
    default:
    console.log("something didnt work with function randomClass");
  }

  return classString;
}

hbs.registerHelper('error404',  () => {
  // gridSize = res.locals.gridSize;

  var gridSize = randomIntFromInterval(20,50);

  console.log("step 'Grid'");
  htmlCode = "<h1>Not Found</h1>";
  for (i = 0; i < gridSize; i++) {
      htmlCode += `<div class="${randomClass()}">404</div>`
  }
  return new hbs.handlebars.SafeString(htmlCode);
})

module.exports = router;
