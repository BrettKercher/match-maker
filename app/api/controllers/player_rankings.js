'use strict';

const url = require('url');
const PlayerRanking = require('../services/player_rankings');

module.exports.addPlayerRanking = function addPlayerRanking (req, res, next) {
    PlayerRanking.addPlayerRanking(req.swagger.params, res, next);
};

module.exports.getPlayerRankings = function getPlayerRankings (req, res, next) {
    PlayerRanking.getPlayerRankings(req.swagger.params, res, next);
};

module.exports.getPlayerRanking = function getPlayerRanking (req, res, next) {
    PlayerRanking.getPlayerRanking(req.swagger.params, res, next);
};

module.exports.updatePlayerRanking = function updatePlayerRanking (req, res, next) {
    PlayerRanking.updatePlayerRanking(req.swagger.params, res, next);
};
