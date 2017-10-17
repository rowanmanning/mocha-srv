'use strict';

// Dependencies
var child_process = require('child_process');
var request = require('request');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before}) {
  Before(function () {
      this.cliResult = null;
      this.server = {
          process: null,
          url: null
      };
      this.cli = {
          command: null,
          stdout: '',
          stderr: '',
          output: ''
      };
      this.pageContents = null;

      // Paths
      var binPath = __dirname + '/../../../bin/mocha-srv';
      var fixtureTestsPath = __dirname + '/../../fixture/example-tests/test';

      // Start a Mocha server
      this.startServer = function (options, callback) {
          var that = this;
          var callbackCalled = false;

          // Reset output vars
          that.cli.stdout = '';
          that.cli.stderr = '';
          that.cli.output = '';

          // Work out command options
          var cmd = [];
          var option;
          for (option in options) {
              if (options.hasOwnProperty(option)) {
                  cmd.push('--' + option);
                  cmd.push(options[option]);
              }
          }
          cmd.push(fixtureTestsPath);

          // Spawn process
          var process = this.server.process = child_process.spawn(binPath, cmd);
          this.server.url = 'http://localhost:' + (options.port || 3000);

          // Append output data to log
          process.stdout.on('data', function (data) {
              data = data.toString();
              if (data.indexOf('running') !== -1 && !callbackCalled) {
                  callback();
                  callbackCalled = true;
              }
              that.cli.stdout += data;
              that.cli.output += data;
          });

          // Append error data to log
          process.stderr.on('data', function (data) {
              data = data.toString();
              that.cli.stderr += data;
              that.cli.output += data;
          });

          // If the process dies, reset vars
          process.on('exit', function () {
              that.server.process = null;
              that.server.url = null;
              if (!callbackCalled) {
                  callback();
                  callbackCalled = true;
              }
          });
      };

      // Stop a running Mocha server
      this.stopServer = function (callback) {
          callback = callback || function() {};
          if (this.server.process) {
              this.server.process.kill();
          }
          callback();
      };

      // Fetch a server page
      this.fetchPage = function (page, callback) {
          var that = this;
          if (!this.server.url) {
              return callback.fail(new Error('No server is running'));
          }
          request(this.server.url + page, function (err, res, body) {
              if (err) {
                  return callback.fail(err);
              }
              that.pageContents = body;
              callback();
          });
      };

      // Execute a command
      this.exec = function (opts, callback) {
          var that = this;

          // Reset output vars
          that.cli.stdout = '';
          that.cli.stderr = '';
          that.cli.output = '';

          // Execute command
          this.cli.command = binPath.replace(' ', '\\ ') + ' ' +
                             opts + ' ' +
                             fixtureTestsPath.replace(' ', '\\ ');
          child_process.exec(this.cli.command, function (err, stdout, stderr) {
              if (err) {
                  return callback.fail(err);
              }
              that.cli.stdout = stdout.toString();
              that.cli.stderr = stderr.toString();
              that.cli.output = stdout.toString() + stderr.toString();
              callback();
          });
      };

      // Reset the world
      this.reset = function (callback) {
          callback = callback || function() {};
          this.pageContents = null;
          this.cli.command = null;
          this.stopServer(callback);
      };

      // Check whether the world's page content contains a string
      this.pageContentContains = function (text, callback) {
          if (!this.pageContents) {
              return callback.fail(new Error('No page was loaded'));
          }
          if (this.pageContents.toLowerCase().indexOf(text.toLowerCase()) === -1) {
              return callback.fail(new Error('Text "' + text + '" not found in page content'));
          }
          callback();
      };

      // Check whether the world's command line output contains a string
      this.cliOutputContains = function (text, callback) {
          if (!this.cli.command) {
              return callback.fail(new Error('No command was executed'));
          }
          if (this.cli.output.toLowerCase().indexOf(text.toLowerCase()) === -1) {
              return callback.fail(new Error('Text "' + text + '" not found in command output'));
          }
          callback();
      };
  });
});