const express = require('express');

const router = express.Router();

const response = require('../../../network/response');
const controllerUser = require('./index');

//routes
router.get('/', list);
router.get('/:id', get);
router.post('/', add);
router.delete('/', remove);
router.put('/', add);

//internal functions
function list (req, res) {
    controllerUser.list()
        .then(list => {
            response.success(req, res, list, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
};

function get (req, res) {
    controllerUser.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
};

function remove (req, res) {
    controllerUser.remove(req.params.id)
        .then(() => {
            response.success(req, res, `Delete user is ${req.params.id}`, 200);
        })
        .catch(err => {
            response.error(req, res, err.message, 500);
        })
};

function add(req, res) {
    controllerUser.add(req.body)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .then(err => {
            response.error(req, res, err.message, 500);
        })
}

module.exports = router;