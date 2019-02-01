var express = require("express");
var hbs = require("hbs")


//This is the express object
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('today', ()=>{
  var date = new Date();
  return date});

app.set('view engine', 'hbs');

app.use(express.urlencoded());

app.use(express.static(__dirname + "/public"));

//middleware
app.use('/', (req,res,next)=>{
  console.log(new Date());
  next();
})

app.get('/', (req, res) => {
  res.render("index.hbs", {title:"Superman",
name:"Aaron"});
});

//get request -> if a user goes to '/' directory, what do you want to happen
app.get('/other', (req, res) => {
  res.send("<h2>Hello World</h2>");
});

app.get('/stuff', (req, res) => {
  res.send({words:"blahblah", stuff:"jalsjals"});
});

//app.post('/banana', (req, res) => {
app.all('/banana', (req, res) => {
  res.render('banana.hbs', {name:req.query.newname, santa:req.query.present});
});

app.get('/form', (req, res) => {
  res.render('form.hbs');
});

app.listen(3000, () => {
  console.log("Server is up at localhost:3000");
});
