'use strict';

const Model = require('../mongo-model');
const schema = require('./teams-schema');

class Teams extends Model {}

module.exports = new Teams(schema);