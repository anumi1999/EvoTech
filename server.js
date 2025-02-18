var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var http= require('http');
var url = require('url')
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'codybanks',
	database : 'nodelogin'
});
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
http.createServer(function(req,res){
      fs.readFile("./views/hddx1.html","UTF-8",function(err,data){
			  res.writeHead(200, {"Content-Type" : "text\html"});
			  res.end(html);

	  });
	  console.log(req.url);
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', function(request, response) {
	      
            response.sendFile(path.join(__dirname + '/views/hddx1.html'));
            
});
app.post('/log', function(request, response) {
	
			response.redirect('/h');		
			response.end();
		});
app.get('/h', function(request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

    app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
})
app.listen(8080);
