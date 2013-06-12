/*jshint maxlen:160 */
'use strict';

// Dependencies
var pkg = require('../../../package');

// Step definitions
module.exports = function () {
    this.World = require('../support/world').World;

    this.Given(/^I am running a server$/i, function (callback) {
        this.startServer({}, callback);
    });

    this.Given(/^I am running a server on port (\d+)$/i, function (port, callback) {
        this.startServer({port: port}, callback);
    });

    this.Given(/^I am running a server with a title of "([^"]*)"$/i, function (title, callback) {
        this.startServer({title: title}, callback);
    });

    this.Given(/^I am running a server with the "([^"]*)" UI$/i, function (ui, callback) {
        this.startServer({ui: ui}, callback);
    });

    this.When(/^I access the server URL$/i, function (callback) {
        this.fetchPage('/', callback);
    });

    this.When(/^I access the server's bundled JavaScript$/i, function (callback) {
        this.fetchPage('/test.js', callback);
    });

    this.When(/^I ask for help$/i, function (callback) {
        this.exec('--help', callback);
    });

    this.When(/^I ask for the program version$/i, function (callback) {
        this.exec('--version', callback);
    });

    this.Then(/^I should see "([^"]*)" in the page content$/i, function (text, callback) {
        this.pageContentContains(text, callback);
    });

    this.Then(/^Mocha should be set up with the "([^"]*)" UI$/i, function (ui, callback) {
        this.pageContentContains('mocha.setup(\'' + ui + '\')', callback);
    });

    this.Then(/^I should see "([^"]*)" in the command output$/i, function (text, callback) {
        this.cliOutputContains(text, callback);
    });

    this.Then(/^I should see usage information$/i, function (callback) {
        this.cliOutputContains('usage:', callback);
    });

    this.Then(/^I should see the version number$/i, function (callback) {
        this.cliOutputContains(pkg.version, callback);
    });

};
