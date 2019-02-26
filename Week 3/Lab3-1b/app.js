const express = require('express');
var hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
  extended: false
}));

function rando() {
  return Math.round(Math.random() * 4 + 1);
}


function randomColorValue() {
  var randColor = ((1 << 24) * Math.random() | 0).toString(16).toUpperCase();
  return randColor;
}

//middleware
app.get('/grid', (req, res) => {
  //res.locals.gridSize = req.params.gridSize;
  console.log("step 'form'");
  res.render("form.hbs");
})


app.post('/grid', (req, res) => {
  //res.locals.gridSize = req.params.gridSize;
  console.log("step 'Size'");
  res.render("grid.hbs", {gridSize: req.body.gridSize })//req.body."name of form field ('gridSize')"});
})


  //return new hbs.handlebars.SafeString(htmlCode);

    hbs.registerHelper('htmlGrid',  (gridSize) => {
      // gridSize = res.locals.gridSize;

      console.log("step 'Grid'");
      htmlCode = "";
      for (i = 0; i < gridSize; i++) {
        htmlCode += "<tr>";
        for (j = 0; j < gridSize; j++) {
          var colorValue = randomColorValue();

          htmlCode += "<td style=\'background-color:#";
          htmlCode += colorValue;
          htmlCode += ";\'>";
          htmlCode += colorValue;
          htmlCode += "<br\/><span style=\'color:#";
          htmlCode += "ffffff";
          htmlCode += ";\'>";
          htmlCode += colorValue;
          htmlCode += "<\/span>";
          htmlCode += "<\/td>";

        }
        htmlCode += "<\/tr>";
        ;

      }
      console.log("step 'HTML'");
      return new hbs.handlebars.SafeString(htmlCode);
    })




app.listen(3000, () => {
  console.log('Server is running on Port 3000');
})