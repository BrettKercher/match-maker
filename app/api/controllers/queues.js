'use strict';

const url = require('url');

const Queue = require('../services/queues');

module.exports.addQueue = function addQueue (req, res, next) {
    Queue.addQueue(req.swagger.params, res, next);
};

module.exports.getQueue = function getQueue (req, res, next) {
    Queue.getQueue(req.swagger.params, res, next);
};

module.exports.getQueuesForGameMode = function getQueuesForGameMode (req, res, next) {
    Queue.getQueuesForGameMode(req.swagger.params, res, next);
};

module.exports.getQueues = function getQueues (req, res, next) {
    Queue.getQueues(req.swagger.params, res, next);
};

module.exports.updateQueue = function updateQueue (req, res, next) {
    Queue.updateQueue(req.swagger.params, res, next);
};
