'use strict';

var loginRouter = require('./login');

var express = require('express');
var router = express.Router();

const adminApi = '/admin';

router.use(adminApi,loginRouter)


module.exports = router;
