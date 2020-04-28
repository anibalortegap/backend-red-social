const express = require('express');

const router = express.Router();

const response = require('../../../network/response');
const controllerUser = require('./index');
const secure = require('./secure');

//routes
router.get('/', list);
router.post('/follow/:id', secure('follow'), follow);
router.get('/follow', secure('follow'), getFollow);
router.get('/:id', get);
router.post('/', add);
router.delete('/', remove);
router.put('/', secure('update'), add);

//internal functions
function list(req, res, next) {
  controllerUser
    .list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  controllerUser
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function remove(req, res) {
  controllerUser
    .remove(req.params.id)
    .then(() => {
      response.success(req, res, `Delete user is ${req.params.id}`, 200);
    })
    .catch(next);
}

function add(req, res, next) {
  controllerUser
    .add(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function follow(req, res, next) {
  controllerUser
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function getFollow(req, res, next) {
  controllerUser
    .following(req.user.id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
