'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

const auth = require('../auth/middleware');

router.param('model', modelFinder);

router.get('/api/v1/:model', handleGetAll);

router.post('/api/v1/:model', auth('create'), handlePost);

router.get('/api/v1/:model/:id', handleGetOne);

router.put('/appi/v1/:model/:id', auth('update'), handlePutt);

router.patch('/api/v1/:model/:id', auth('update'), handlePut);

router.delete('/api/v1/:model/:id', auth('delete'), handleDelete);

function handleGetAll(req, res, next) {
  req.model.get()
    .then(data => {
      const output = {
        count: data.length,
        res: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

function handleGetOne(req, res, next) {
  req.model.get(req.params.id)
    .then(resule => res.status(200).json(result[0]))
    .catch(next);
}

function handlePost(req,res, next){
  req.model.post(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function handlePut(req,res,next){
  req.model.put(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

function handleDelete(req,res,next) {
  req.model.delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next)
}

module.exports = router;