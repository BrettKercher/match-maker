'use strict';

const db = require('../../inc/mysql');
const Queues = db.import('../models/queue');
const GameModes = db.import('../models/game_mode');
const QueueManager = require('../../inc/queueManager');

const validator = require('validator');
const async = require('async');
const _ = require('lodash');

exports.addQueue = function(args, res, next) {
    /**
     * Add a new queue to a game mode
     *
     * @path: PUT - /gameModes/{gameModeId}/queues/
     * @param: gameModeId - int - Id of game mode to add this queue to
     * @param: queue - Queue - Queue to add
     * @returns: status - 201 - Queue - The added queue
     * @returns: status - 400 - None
     * @returns: status - 404 - None
    **/

    const gameModeId = args.gameModeId.value;
    let queue = args.queue.value;
    queue.gameModeId = gameModeId;

    if(!validator.isUUID(gameModeId)) {
        res.status(400).send();
        return next();
    }

    async.series([
        function(callback) {
            GameModes.count({ where: {'id':gameModeId}}).then(function(count) {
                const error = count > 0 ? null : new Error();
                return callback(error);
            }, function(err) {
                return callback(err);
            });
        },
        function(callback) {
            Queues.create(queue).then(function(result) {
                return callback(null, result);
            }, function(err) {
                console.log(err);
                callback(err);
            });
        }
    ], (err, results) => {
        if(err) {
            res.status(400).send();
            return next();
        }
        QueueManager.addQueue(results[1].id);
        res.status(201).send(results[1]);
        return next();
    });
};

exports.getQueue = function(args, res, next) {
  /**
   * View information about a specific queue for the specified game mode
   *
   * @path: GET - /queues/{queueId}/
   * @oaram: gameModeId - int - Id of game mode to query
   * @param: queueId - int - Id of queue to query
   * @returns 200 - Queue - The requested queue
   * @returns 404 - None
   * @returns 400 - None
   **/

  const queueId = args.queueId.value;

    if(!validator.isUUID(queueId)) {
        res.status(400).send();
        return next();
    }

    Queues.findById(queueId).then(function(result) {
        if(!result) {
            res.status(404).send();
            return;
        }
        res.status(200).send(result);
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });
};

exports.getQueues = function(args, res, next) {
    /**
     * View information about all queues
     * Returns all queues
     *
     * @path: GET - /queues/
     * @returns 200 - Array[Queue] - An array of all queues associated with the provided game mode
     * @returns 400 - None
     **/

    Queues.findAll().then(function(results) {
        res.status(200).send(results);
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });

};

exports.getQueuesForGameMode = function(args, res, next) {
    /**
     * View information about all queues for the requested game mode
     * Returns all queues for a specified game mode
     *
     * @path - GET - /gameModes/{gameModeId}/queues/
     * @param: gameModeId - int - Id of game mode to query
     * @returns 200 - Array[Queue] - An array of all queues associated with the provided game mode
     * @returns 400 - None
    **/

    const gameModeId = args.gameModeId.value;

    if(!validator.isUUID(gameModeId)) {
        res.status(400).send();
        return next();
    }

    Queues.findAll({where: {'gameModeId': gameModeId}}).then(function(results) {
        res.status(200).send(results);
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    })
};

exports.updateQueue = function(args, res, next) {
    /**
     * Update game mode
     * Update the specified field of the specified game mode with the provided value
     *
     * @path: PATCH - /queues/{queueId}
     * @param: queueId - int - Id of queue to update
     * @param: queue - Queue - A subset of queue keys/values in which to update
     * @returns: status - 204 - None
     * @returns: status - 404 - None
     **/

    const propsToChange = args.queue.value;
    const queueId = args.queueId.value;

    if(!validator.isUUID(queueId)) {
        res.status(400).send();
        return next();
    }

    Queues.update(propsToChange, { where: { id: queueId } }).then(function(results) {
        if(results[0] <= 0) {
            res.status(404).send();
        }
        else {
            res.status(204).send();

            if(propsToChange.hasOwnProperty('enabled')) {
                propsToChange.enabled ? QueueManager.addQueue(queueId) : QueueManager.removeQueue(queueId);
            }
        }
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });
};

