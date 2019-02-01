var http = require('http');
var request = require('request');
const fs = require('fs');

http.createServer(function (request, response) {

    //response.writeHead(302, { 'Location': "http://" + request.headers['host'] + '/index.html' });

    if (request.url === '/todo') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        fs.readFile('todo.json', (err, data) => {
            if (err) throw err;
            response.write(data);
            response.end();
        });
    }
    else if (request.url === '/index') {

        fs.readFile("index.html", function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }

    else if (request.url === '/read-todo') {



    }

    else {
        //console.log(request.headers);
        //return response.redirect('/index');
        response.writeHead(302, { 'Location': "http://" + request.headers['host'] + '/index' });
        //console.log(request.url);
        console.log(request.headers['host']);
        return response.end;
    }




}).listen(5500);

/* Console will print the message */
console.log('Server running at http://localhost:5500/');