
Feature: Server
    As a developer
    I want to be able to run a simple web-server which serves my Mocha tests
    So that I don't have to manage Mocha client-side assets or manually bundle my tests for browsers

    Scenario: Run the server
        Given I am running a server
        When I access the server URL
        Then I should see "Test Suite" in the page content
        And Mocha should be set up with the "bdd" UI

    Scenario: Run the server with a custom port
        Given I am running a server on port 4000
        When I access the server URL
        Then I should see "Test Suite" in the page content

    Scenario: Run the server with a custom title
        Given I am running a server with a title of "Hello World"
        When I access the server URL
        Then I should see "Hello World" in the page content

    Scenario: Run the server with a non-default UI
        Given I am running a server with the "tdd" UI
        When I access the server URL
        Then Mocha should be set up with the "tdd" UI
