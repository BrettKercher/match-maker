'use strict';

const db = require('../../inc/mysql');
const GameModes = db.import('../models/game_mode');

exports.addGameMode = function(args, res, next) {
    /**
     * Add a new game mode
     *
     * @path: POST - /gameModes/
     * @param: gameMode - GameMode - New game mode to add
     * @returns: status - 201 - GameMode - The added game mode
     * @returns: status - 400 - None
    **/

    const gameMode = args.gameMode.value;

    GameModes.create(gameMode).then(function(result) {
        res.location('/gameMode/' + result.id);
        res.status(201).send(result);
    }, function(err) {
        console.log(err);
        res.status(400).send();
    }).then(function() {
        return next;
    });
};

exports.getGameMode = function(args, res, next) {
    /**
     * View information about a specific game mode
     *
     * @path: GET - /gameModes/{gameModeId}/
     * @param: gameModeId - int - Id of game mode to query
     * @returns: status - 200 - GameMode - The queried game mode
     * @returns: status - 400 - None
     * @returns: status - 404 - None
    **/

    const gameModeId = args.gameModeId.value;

    GameModes.findById(gameModeId).then(function(result) {
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

exports.getGameModes = function(args, res, next) {
    /**
     * Get all game modes
     *
     * @path: GET - /gameModes/
     * @returns: status - 200 - Array[GameMode] - An array of all game modes
     * @returns: status - 400 - None
    **/

    GameModes.findAll().then(function(results) {
        res.status(200).send(results);
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });

};

exports.updateGameMode = function(args, res, next) {
    /**
     * Update game mode
     * Update the specified field of the specified game mode with the provided value
     *
     * @path: PATCH - /gameModes/{gameModeId}
     * @param: gameModeId - int - Id of game mode to query
     * @param: gameMode - GameMode - A subset of gameMode keys/values in which to update
     * @returns: status - 204 - GameMode - The specified game mode with the newly updated values
     * @returns: status - 400 - None
     * @returns: status - 404 - None
     **/

    const propsToChange = args.gameMode.value;
    const gameModeId = args.gameModeId.value;

    GameModes.update(propsToChange, { where: { id: gameModeId } }).then(function(results) {
        if(results[0] <= 0) {
            res.status(404).send();
        }
        else {
            res.status(204).send();
        }
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });
};