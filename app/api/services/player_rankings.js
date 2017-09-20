'use strict';

const db = require('../../inc/mysql');
const PlayerRankings = db.import('../models/player_ranking');

exports.addPlayerRanking = function(args, res, next) {
    /**
     * Create a new player ranking record for the given player name
     *
     * @path: POST - /playerRankings/
     * @param: gameMode - PlayerName - Name of the player to create a player ranking record for
     * @returns: status - 201 - PlayerRank - The new created player ranking record
     * @returns: status - 400 - None
     **/

    const playerRanking = args.playerRanking.value;

    PlayerRankings.create(playerRanking).then(function(result) {
        console.log(result);
        res.location('/playerRanking/' + result.id);
        res.status(201).send(result);
    }, function(err) {
        console.log(err);
        res.status(400).send();
    }).then(function() {
        return next;
    });
};

exports.getPlayerRanking = function(args, res, next) {
    /**
     * View information about a specific player ranking
     *
     * @path: GET - /playerRankings/{playerRankingId}/
     * @param: gameModeId - int - Id of player ranking to query
     * @returns: status - 200 - GameMode - The queried player ranking
     * @returns: status - 400 - None
     * @returns: status - 404 - None
     **/

    const playerRankingId = args.playerRankingId.value;

    PlayerRankings.findById(playerRankingId).then(function(result) {
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

exports.getPlayerRankings = function(args, res, next) {
    /**
     * Get all game modes
     *
     * @path: GET - /playerRankings/
     * @returns: status - 200 - Array[PlayerRanking] - An array of all player rankings
     * @returns: status - 400 - None
     **/

    PlayerRankings.findAll().then(function(results) {
        res.status(200).send(results);
    }, function() {
        res.status(400).send();
    }).then(function() {
        return next();
    });

};

exports.updatePlayerRanking = function(args, res, next) {
    /**
     * Update player ranking
     * Update the specified field of the specified player ranking with the provided value
     *
     * @path: PATCH - /playerRankings/{playerRankingId}
     * @param: gameModeId - int - Id of player ranking to query
     * @param: gameMode - PlayerRanking - A subset of PlayerRanking keys/values in which to update
     * @returns: status - 204 - PlayerRanking - The specified player ranking with the newly updated values
     * @returns: status - 400 - None
     * @returns: status - 404 - None
     **/

    const propsToChange = args.playerRanking.value;
    const playerRankingId = args.playerRankingId.value;

    PlayerRankings.update(propsToChange, { where: { id: playerRankingId } }).then(function(results) {
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
