'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);
const auth = require(/*`${cwd}/src/auth/middleware.js` */)

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder);

// API Routes

router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model',auth('create'), handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', auth('update'), handlePut);
router.patch('/api/v1/:model/:id', auth('update'), handlePut);
router.delete('/api/v1/:model/:id', auth('delete'), handleDelete);

// Route Handlers

/**
 * Get a list of records for model provided
 * @route GET /api/v1/:model
 * @param {string} model.path.required
 * @returns {Object} 500 - Server Error
 * @returns {Object} 200 - { count 2, results}
 * 
 */

function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

/**
 * Get one item for model provided
 * @route GET /api/v1/:model/:id
 * 
 * @returns {Object} 500 - Server Error
 * @returns {Object} 200 - { count 2, results}
 * 
 */

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

/**
 * Get a list of records for model provided
 * @route POST /api/v1/:model
 * @param {string} model.path.required
 * @consumes application/json application/xml
 * @returns {Object} 500 - Server Error
 * @returns {Object} 200 - { count 2, results}
 * 
 */

function handlePost(request,response,next) {
  request.model.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * Get a list of records for model provided
 * @route PUT /api/v1/
 * @returns {Object} 500 - Server Error
 * @returns {Object} 200 - { count 2, results}
 * 
 */

function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

/**
 * Get a list of records for model provided
 * @route DELETE /api/v1/
 * @returns {Object} 500 - Server Error
 * @returns {Object} 200 - { count 2, results}
 * 
 */

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
