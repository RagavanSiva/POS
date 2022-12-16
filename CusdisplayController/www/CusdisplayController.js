var exec = require('cordova/exec');

exports.commit = function(portPath, success, error) {
    exec(success, error, 'CusdisplayController', 'commit', [portPath]);
};

exports.init = function(success, error) {
    exec(success, error, 'CusdisplayController', 'init');
};

exports.printTest = function(success, error) {
    exec(success, error, 'CusdisplayController', 'printTest');
};

exports.printTest2 = function(success, error) {
    exec(success, error, 'CusdisplayController', 'printTest2');
};

exports.print = function(msg, success, error) {
    exec(success, error, 'CusdisplayController', 'print', [msg]);
};

exports.setBaudrate = function(baudRate, success, error) {
    exec(success, error, 'CusdisplayController', 'setBaudrate', [baudRate]);
};

exports.enablePriceLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enablePriceLight');
};

exports.disablePriceLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'disablePriceLight');
};

exports.enableTotalLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableTotalLight');
};

exports.disableTotalLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'disableTotalLight');
};

exports.enableCollectLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableCollectLight');
};

exports.disableCollectLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'disableCollectLight');
};

exports.enableChangeLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableChangeLight');
};

exports.disableChangeLight = function(success, error) {
    exec(success, error, 'CusdisplayController', 'disableChangeLight');
};

exports.clearDisplay = function(success, error) {
    exec(success, error, 'CusdisplayController', 'clearDisplay');
};

exports.clearCurrentLine = function(success, error) {
    exec(success, error, 'CusdisplayController', 'clearCurrentLine');
};

exports.disableAll = function(success, error) {
    exec(success, error, 'CusdisplayController', 'disableAll');
};

exports.enablePrice = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enablePrice');
};

exports.enableTotal = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableTotal');
};

exports.enableCollect = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableCollect');
};

exports.enableChange = function(success, error) {
    exec(success, error, 'CusdisplayController', 'enableChange');
};

exports.portReset = function(success, error) {
    exec(success, error, 'CusdisplayController', 'portReset');
};
