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
router.post('/',[], (req, res) => { loginController.login(req,res) });
router.post('/register',[], (req, res) => { loginController.register(req,res) });
router.get('/get-all-user',validateUser.validateToken, (req, res) => { loginController.getAllUser(req,res) });
router.get('/logout',[], (req, res) => { loginController.logout(req,res) });


/*End*/

module.exports = router;
