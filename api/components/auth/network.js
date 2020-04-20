const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controllerAuth = require('./index');

router.post('/login', (req, res) => {
  controllerAuth
    .login(req.body.username, req.body.password)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, 'invalid data', 400);
    });
});

module.exports = router;
