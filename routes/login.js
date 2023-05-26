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

/**
* @swagger
{
"/login": {
	"post": {
		"tags": ["Login"],
		"name": "Login",
		"summary": "Login",
		"consumes": [
			"application/json"
		],
		"parameters": [			
			{
				"in": "body",
				"name": "body,",
				"schema": {
					"$ref": "#/",
					"type": "object",
					"properties": {
						"username": {
							"value": "",
							"type": "string"
						},
						"password": {
							"value": "",
							"type": "string"
						}
					}
				},
				"required": [
					"username",
					"password"
				]
			}
		],
		"responses": {
			"200": {
				"description": "logedin successfully."
			},
			"400": {
				"description": "Wrong requested parameter."
			},
			"500": {
				"description": "Internal server error."
			}
		}
		}
	}
}
*/
router.post('/login',[], (req, res) => { loginController.login(req,res) });
router.post('/register',[], (req, res) => { loginController.register(req,res) });
router.get('/get-all-user', validateUser.validateToken, (req, res) => { loginController.getAllUser(req,res) });
router.post('/update-user', validateUser.validateToken, (req, res) => { loginController.updateUser(req,res) });
router.post('/regenerate-token', validateUser.regenerateToken);
router.get('/user-role',  (req, res) => { loginController.userRoles(req,res) });
/*End*/

module.exports = router;
