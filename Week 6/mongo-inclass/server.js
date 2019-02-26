const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const messages = require("./exports/hello.js");
var Person = require("./schema/person.js");

var app = express();
app.set("view egnine", hbs);
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

/*
messages.hello();
messages.goodbye();
*/

mongoose.connect('mongodb://localhost:27017/People', {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("we're connected")
});

var blamo = new Person({
firstName:'Jojo',
lastName: 'Jostar',
age:20
})

blamo.save(function(err, person){
    if (err) return console.error(err);
    console.log("Saved "+ person);
})

app.get('/People', function(req, res){
    Person.find({firstName:"Jojo"}, function(err, data){
        console.log(data)
    })
})

app.use(express.urlencoded({extended:false}));



app.get("/", function(req, res){
    res.send("hello")
})

app.listen("3000", function(){
    console.log("using port 3000")
})