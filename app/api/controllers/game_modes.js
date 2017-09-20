'use strict';

const url = require('url');
const GameMode = require('../services/game_modes');

module.exports.addGameMode = function addGameMode (req, res, next) {
    GameMode.addGameMode(req.swagger.params, res, next);
};

module.exports.getGameMode = function getGameMode (req, res, next) {
    GameMode.getGameMode(req.swagger.params, res, next);
};

module.exports.getGameModes = function getGameModes (req, res, next) {
    GameMode.getGameModes(req.swagger.params, res, next);
};

module.exports.updateGameMode = function updateGameMode (req, res, next) {
    GameMode.updateGameMode(req.swagger.params, res, next);
};
