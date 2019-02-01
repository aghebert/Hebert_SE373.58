/*
 * This is the most simple level of how to read a file in Node.js
 */


var fileSystem = require('fs');

fileSystem.readFile('input.txt' , function (err, data) {
    if (err) return console.error(err);
    console.log( data.toString() );
});
//writes data to file
fileSystem.appendFileSync("input.txt", "farts");

console.log('Program completed');
