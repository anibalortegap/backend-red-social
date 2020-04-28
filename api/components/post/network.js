const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controllerPost = require('./index');

//routes
router.post('/', add);
router.get('/', list);

function add(req, res, next) {
  controllerPost
    .add(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function list(req, res, next) {
  controllerPost
    .list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
