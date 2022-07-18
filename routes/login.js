'use strict';
var express = require('express');
var router = express.Router();

/*Controller initialization*/
var loginController = require('../app/controller/login/login');
/*End*/

/*Middleware initialization*/
var validateUser = require('../middleware/verify-user');
/*End*/

/*Admin routing*/
router.post('/login',[], (req, res) => { loginController.login(req,res) });
router.post('/register',[], (req, res) => { loginController.register(req,res) });
router.get('/get-all-user', validateUser.validateToken, (req, res) => { loginController.getAllUser(req,res) });
router.post('/update-user', validateUser.validateToken, (req, res) => { loginController.updateUser(req,res) });
router.post('/regenerate-token', validateUser.regenerateToken);

/*End*/

module.exports = router;
