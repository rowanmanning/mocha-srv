'use strict';

// After each scenario
module.exports = function () {

    // Reset the world
    this.After(function (callback) {
        this.reset(callback);
    });

};
