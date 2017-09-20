'use strict';

const url = require('url');
const Party = require('../services/parties');

module.exports.addParty = function addParty (req, res, next) {
    Party.addParty(req.swagger.params, res, next);
};