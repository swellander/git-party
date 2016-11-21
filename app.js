var express = require('express');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var path = require('path');

var routes = require('./routes');

var app = express();

app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// custom error handling
app.use(function (err, req, res, next) {
  // clean up the trace to just relevant info
  var cleanTrace = err.stack
  .split('\n')
  .filter(line => {
    // comment out the next two lines for full (verbose) stack traces
    var projectFile = line.indexOf(__dirname) > -1; // omit built-in Node code
    var nodeModule = line.indexOf('node_modules') > -1; // omit npm modules
    return projectFile && !nodeModule;
  })
  .join('\n');
  // colorize and format the output
  console.log(chalk.magenta('      ' + err.message));
  console.log('    ' + chalk.gray(cleanTrace));
  // send back error status
  res.status(err.status || 500).end();
});

module.exports = app;
