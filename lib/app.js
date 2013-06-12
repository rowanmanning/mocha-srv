'use strict';

// Dependencies
var browserify = require('browserify');
var express = require('express');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

// Create an application
exports.create = function (opts) {
    var app = express();
    bindRoutes(app, opts);
    return app;
};

// Bind application routes
function bindRoutes (app, opts) {

    // Main test page
    app.get('/', function (req, res) {
        renderTmpl(__dirname + '/../view/index.html', opts, function (err, content) {
            res.send(content);
        });
    });

    // Mocha files
    app.get(/^\/mocha\.(js|css)$/, function (req, res) {
        var path = __dirname + '/../node_modules/mocha/mocha.' + req.params[0];
        fs.readFile(path, 'utf8', function (err, file) {
            res.type(req.params[0]);
            res.send(file);
        });
    });

    // JavaScript bundler
    app.get('/test.js', function (req, res) {
        var bundler = browserify();
        glob(path.resolve(opts.path, '**/*.js'), function (err, files) {
            if (err) { throw err; }
            files.forEach(function (file) {
                bundler.add(file);
            });
            bundler.bundle(function (err, data) {
                if (err) { throw err; }
                res.type('js');
                res.send(data);
            });
        });
    });

}

// Poor-man's mustache
function renderTmpl (path, vars, callback) {
    fs.readFile(path, 'utf8', function (err, file) {
        if (err) {
            return callback(err);
        }
        var out = file.replace(/\{\{([a-z]+)\}\}/ig, function (all, name) {
            return vars[name];
        });
        callback(null, out);
    });
}
