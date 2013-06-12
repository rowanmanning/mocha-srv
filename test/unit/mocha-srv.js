/*jshint maxlen: 140 */
/*global afterEach, beforeEach, describe, it */
'use strict';

// Dependencies
var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

// Test subject
var mochaSrv = require('../../lib/mocha-srv');

// Test suite
describe('mocha-srv', function () {
    var app, appModule;

    beforeEach(function () {
        mockery.enable();
        app = {
            listen: sinon.spy(),
            close: sinon.spy()
        };
        appModule = {
            create: sinon.stub().returns(app)
        };
        mockery.registerMock('./app', appModule);
    });

    afterEach(function () {
        mockery.deregisterMock('./app');
        mockery.disable();
    });

    it('should be an object', function () {
        assert.isObject(mochaSrv);
    });

    describe('.Server', function () {

        it('should be a function', function () {
            assert.isFunction(mochaSrv.Server);
        });

        describe('instance', function () {

            it('should have a host property set to \'localhost\'', function () {
                var server = new mochaSrv.Server();
                assert.strictEqual(server.host, 'localhost');
            });

            it('should have a port property set to 3000', function () {
                var server = new mochaSrv.Server();
                assert.strictEqual(server.port, 3000);
            });

            it('should have a port property set to the port option if present', function () {
                var server = new mochaSrv.Server({port: 1234});
                assert.strictEqual(server.port, 1234);
            });

            it('should set a default title option', function () {
                var server = new mochaSrv.Server();
                assert.strictEqual(server.opts.title, 'Test Suite');
            });

            it('should set a default ui option', function () {
                var server = new mochaSrv.Server();
                assert.strictEqual(server.opts.ui, 'bdd');
            });

            it('should set a default path option', function () {
                var server = new mochaSrv.Server();
                assert.strictEqual(server.opts.path, process.cwd());
            });

            it('should resolve the path option if present', function () {
                var server = new mochaSrv.Server({
                    path: './foo'
                });
                assert.strictEqual(server.opts.path, process.cwd() + '/foo');
            });

            it('should create an application', function () {
                new mochaSrv.Server();
                assert.isTrue(appModule.create.calledOnce);
            });

            it('should create an application with the options passed into the constructor', function () {
                var opts = {};
                new mochaSrv.Server(opts);
                assert.isTrue(appModule.create.withArgs(opts).calledOnce);
            });

            describe('.start()', function () {

                it('should make the application start listening on a port', function () {
                    var server = new mochaSrv.Server();
                    var callback = function () {};
                    server.start(callback);
                    assert.isTrue(app.listen.withArgs(3000, callback).calledOnce);
                });

            });

            describe('.stop()', function () {

                it('should stop the application', function () {
                    var server = new mochaSrv.Server();
                    server.stop();
                    assert.isTrue(app.close.calledOnce);
                });

            });

        });

    });

});
