var mysql = require('mysql');
var express = require('express');
var session = require('session');
var bodyParser = require('bodyParser');
var path=require('path');

var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'codybanks',
  database  : 'nodelogin'
});

var app = express();

app.use.(session({
  secret  : 'secret',
  resave  : 'true',
  saveUninitialized : 'true'
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/',function(request,response){
  response.sendFile(path.join(__dirname+'/signup.html'));
});

app.post('/auth',function(request,response){
  var username = request.body.email;
  var password = request.body.psw;
  var email = request.body.email;
  var cardno = request.body.card;

  if(username&&password&&email&&cardno){
    connection.query('INSERT INTO accounts SET ?',[username,password,enail,cardno],function(error, results, fields){
      if(error){
        console.log("error occurred",error);
        response.send({
          "code"  : 400,
          "failed"  : "error occurred"
        })
      }else{
        console.log("The solution is: ",results);
        response.send({
          "code"  : 400,
          "success" : "user registered successfully"
        });
      });
    }
  }

app.listen(8080);
