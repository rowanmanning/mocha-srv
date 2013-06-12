

mocha-srv
=========

mocha-srv runs a simple HTTP server, serving up your [Mocha][mocha] tests. This allows you to run the same suite of tests on the command line (with Node.js) and in the browser.

**Current Version:** *0.0.0*  
**Node Support:** *0.8, 0.10*


Getting Started
---------------

mocha-srv requires [Node.js][node] and npm. Once you have these dependencies, you can install mocha-srv with the following command:

```sh
$ npm install -g mocha-srv
```


Usage
-----

Once installed, the `mocha-srv` command should be available to you.

```

  Usage: mocha-srv [options] <path>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -p, --port <port>    specify the port to run the server on. Default: 3000
    -t, --title <title>  specify the test suite title
    -u, --ui <ui>        specify the Mocha UI your tests use, one of: bdd (default), tdd

```

Example:

```sh
# Run mocha-srv, serving unit tests in ./tests
$ mocha-srv ./tests

# Run mocha-srv on port 1337 and run tests in TDD style
$ mocha-srv -p 1337 -u tdd ./tests
```


Development
-----------

To develop mocha-srv, you'll need to clone the repo and install dependencies with `make deps`. If you're on Windows, you'll also need to install [Make for Windows][make].

Once you're set up, you can run the following commands:

```sh
$ make deps         # Install dependencies
$ make lint         # Run JSHint with the correct config
$ make test         # Run unit/feature tests
```

When no build target is specified, make will run `deps lint test`. This means you can use the following command for brevity:

```sh
$ make
```

Code with lint errors or no/failing tests will not be accepted, please use the build tools outlined above.


License
-------

mocha-srv is licensed under the [MIT][mit] license.



[make]: http://gnuwin32.sourceforge.net/packages/make.htm
[mit]: http://opensource.org/licenses/mit-license.php
[mocha]: http://visionmedia.github.com/mocha/
[node]: http://nodejs.org/
