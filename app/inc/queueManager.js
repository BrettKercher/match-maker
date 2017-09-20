'use strict';

const childProcess = require('child_process');
const validator = require('validator');
const _ = require('lodash');

const db = require('./mysql');
const Queues = db.import('../api/models/queue');

class QueueManager {

    constructor(_type) {
        this.type = _type;
        this.qProcesses = {}
    }

    initialize() {
        const self = this;
        Queues.findAll({ where: {'enabled':true}}).then(function(results) {
            _.forEach(results, function(queue) {
                self.addQueue(queue.id);
            });
        }, function() {
            console.log("error initializing queues");
        });
    }

    addQueue(queueId) {
        if(!validator.isUUID(queueId)) {
            return;
        }

        if(!this.qProcesses[queueId]) {
            const queueProcess = childProcess.fork('./app/workers/queue');
            queueProcess.on('message', this._onQueueMessage);
            queueProcess.send({type: 0, queue: queueId});
            this.qProcesses[queueId] = queueProcess;
        }
    }

    removeQueue(queueId) {
        if(!validator.isUUID(queueId)) {
            return;
        }

        if(this.qProcesses[queueId]) {
            this.qProcesses[queueId].kill('SIGINT');
            this.qProcesses[queueId] = null;
        }
    }

    _onQueueMessage(msg) {
        /**
         * Handle an incoming message from a queue
         *
         * Every incoming message will have at least 2 properties:
         * sender:  The queue object that sent the message
         * type:    The type of message
         **/

        if(msg.type === -1) {
            console.log(msg);
        }
    }
}

module.exports = new QueueManager();