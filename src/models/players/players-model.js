'use strict';

const Model = require('../mongo-model');
const schema = require('./players-schema');

class Players extends Model {}

module.exports = new Players(schema);
