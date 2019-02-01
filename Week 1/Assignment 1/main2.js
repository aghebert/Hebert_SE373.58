var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {

            var pathName = url.parse(request.url).pathname;
            var fileName = pathName.substr(1); /* lets remove the "/" from the name */

            /* lets try to read the html page found */
            fileSystem.readFile(fileName, callback);

            function callback(err, data) {
                if (err) {
                    console.error(err);
                    /* Send the HTTP header 
                     * HTTP Status: 400 : NOT FOUND
                     * Content Type: text/html 
                     */
                    response.writeHead(301, {
                        'Location': "http://" + request.headers['host'] + '/index.html'
                    });
                } else {
                    if (request.url === '/todo') {
                        response.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        fs.readFile('todo.json', (err, data) => {
                            if (err) throw err;
                            response.write(data);
                            response.end();
                        });
                    } else if (request.url === '/index') {

                        fs.readFile("index.html", function (err, data) {
                            response.writeHead(200, {
                                'Content-Type': 'text/html'
                            });
                            response.write(data);
                            response.end();
                        });
                    } else if (request.url === '/read-todo') {


                        request('http://localhost:5500/todo', {
                            json: true
                        }, (error, res, jsonObj) => {
                            if (error) {
                                return console.log(err);
                            }

                            for (var attributeName in jsonObj) {
                                console.log(attributeName + ": " + jsonObj[attributeName]);
                            }

                        })
                    }

                    /* the response is complete */
                    //response.end();
                }

            }
            }).listen(5500);

        // Console will print the message
        console.log('Server running at http://localhost:5500/index.html');