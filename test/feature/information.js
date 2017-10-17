const {defineSupportCode} = require('cucumber');
const pkg = require('../../package');

defineSupportCode(function({Given, When, That, World, Then}) {
    Given(/^I am running a server$/i, function (callback) {
        this.startServer({}, callback);
    });
    
    Given(/^I am running a server on port (\d+)$/i, function (port, callback) {
        this.startServer({port: port}, callback);
    });
    
    Given(/^I am running a server with a title of "([^"]*)"$/i, function (title, callback) {
        this.startServer({title: title}, callback);
    });
    
    Given(/^I am running a server with the "([^"]*)" UI$/i, function (ui, callback) {
        this.startServer({ui: ui}, callback);
    });
    
    When(/^I access the server URL$/i, function (callback) {
        this.fetchPage('/', callback);
    });
    
    When(/^I access the server's bundled JavaScript$/i, function (callback) {
        this.fetchPage('/test.js', callback);
    });
    
    When(/^I ask for help$/i, function (callback) {
        this.exec('--help', callback);
    });
    
    When(/^I ask for the program version$/i, function (callback) {
        this.exec('--version', callback);
    });
    
    Then(/^I should see "([^"]*)" in the page content$/i, function (text, callback) {
        this.pageContentContains(text, callback);
    });
    
    Then(/^Mocha should be set up with the "([^"]*)" UI$/i, function (ui, callback) {
        this.pageContentContains('mocha.setup(\'' + ui + '\')', callback);
    });
    
    Then(/^I should see "([^"]*)" in the command output$/i, function (text, callback) {
        this.cliOutputContains(text, callback);
    });
    
    Then(/^I should see usage information$/i, function (callback) {
        this.cliOutputContains('usage:', callback);
    });
    
    Then(/^I should see the version number$/i, function (callback) {
        this.cliOutputContains(pkg.version, callback);
    });
});
