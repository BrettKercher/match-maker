'use strict';

const _ = require('lodash');

(function () {

    let owningQueue = null;
    let counter = 0;

    let unqueuedParties = [];
    let queuedParties = [];

    process.on('message', (msg) => {
        /**
         * Handle an incoming message from the root process
         *
         * Every incoming message will have at least one property:
         * type:    The type of message
         **/

        if(!msg.hasOwnProperty('type')) {
            console.log('ERROR: received untyped message!');
            return;
        }

        if(msg.type === 0) {
            //TODO : don't assume the message is properly formed
            owningQueue = msg.queue;

            setInterval(() => {
                sendMessage({ type: -1, counter: counter++ });
            }, 1000);
        }
    });

    function sendMessage(msg) {
        /**
         * Send a message to the parent process.
         * The message must have a type property to distinguish what type of message it is.
         * A sender property will be automatically appended and is used by the parent to identify the queue
         * that sent the message
         **/

        _.extend(msg, { sender: owningQueue });
        process.send(msg);
    }
})();

