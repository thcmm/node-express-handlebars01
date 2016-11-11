'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

var famQuotes = [
"I fear the day that technology will surpass our human interaction. The world will have a generation of idiots. - Einstein",
"640K ought to be enough for anybody. - Bill Gates in 1981",
"Remote shopping, while entirely feasible, will flop. - Time magazine in 1966",
"It would appear that we have reached the limits of what it is possible to achieve with computer technology. - John von Neumann in 1949",
"I think there is a world market for maybe five computers. - Thomas Watson, chairman of IBM in 1943", "There is no reason anyone would want a computer in their home. — Ken Olsen   founder of the Digital Equipment Corporation in 1977"];


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// static middleware
app.use(express.static(__dirname + '/public')); // set public assetts

// routes
app.get('/', function(req, res) {
  var randomQuote = famQuotes[Math.floor(Math.random()*famQuotes.length)];
  res.render('home', {famQuote: randomQuote});

  // res.type('text/plain');
  // res.send('Higher Than Travel');
});

app.get('/about', function(req, res) {
  res.render('about');
  // res.type('text/plain');
  // res.send('About: Higher Than Travel');
});


// 404 Catch-All middleware
app.use(function(req, res, next){
  res.type('text/plain');
  res.status('404');
  res.render('404');
  // res.send('404 - Flight cancled. Work another year!');
});

// custom 505
app.use(function(req, res){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.render('500');
  // res.send('500 - Big Yeat!');
});

app.listen(app.get('port'), function(){
  console.log("Node / Express listening on http://localhost: " + app.get('port') + " Ctrl-C to Bye-bye...");
});
