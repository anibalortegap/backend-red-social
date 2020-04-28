const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const controllerAuth = require('./index');

router.post('/login', (req, res, next) => {
  controllerAuth
    .login(req.body.username, req.body.password)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

module.exports = router;
