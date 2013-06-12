
Feature: Server bundle
    As a developer
    I want my running Mocha server to bundle up my tests and library code using CommonJS
    So that I don't have to specify test files individually, and I can minimise duplication between Node and Browser tests

    Scenario: Run the server
        Given I am running a server
        When I access the server's bundled JavaScript
        Then I should see "test-1" in the page content
        And I should see "test-2" in the page content
        And I should see "lib-1" in the page content
        And I should see "lib-2" in the page content
