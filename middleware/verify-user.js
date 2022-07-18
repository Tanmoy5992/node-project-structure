const jwt = require('jsonwebtoken');

const  commonFunction  = require('../helper/commonfunction');

const  UserModel  = require('../app/model/user');

exports.validateToken = async (req, res, next) => {
    var response_status = {};
    var response_dataset = []
    var response_data = {}; 

    try {

        var token = req.headers['authorization'];
    
        if(token){

            if(token.split(' ')[0] === 'Bearer'){
                var decoded = await jwt.verify(token.split(' ')[1], 'secret');
                req.body.loginDetails = decoded;
                req.bodyData = req.body;  
                next();
            } else {
                response_status.msg = 'Authentication failed';
                response_status.action_status = false;
                response_data.dataset = response_dataset;
                response_data.status = response_status;

                res.status(401);
                res.send({ response: response_data });
            }

        } else {
            response_status.msg = 'Authentication failed';
            response_status.action_status = false;
            response_data.dataset = response_dataset;
            response_data.status = response_status;

            res.status(401);
            res.send({ response: response_data });
        }

    } catch (e) {
        response_status.msg = 'Authentication failed';
        response_status.action_status = false;
        response_data.dataset = response_dataset;
        response_data.status = response_status;

        res.status(401);
        res.send({ response: response_data });
    }

}

exports.regenerateToken = async (req, res) => {    
    var response_status = {};
    var response_dataset = {};
    var response_data = {};   
     
    try {
        var userId = req.body.id;
       
        let userRecord = await UserModel.findByAny({where:{'userID':userId}}); 
        if (userRecord.length > 0) {
            var userResp = userRecord[0].dataValues; 
            if(userResp != null){                   
                var userdtls  = {
                    'id'            : userResp.id,
                    'email_address' : userResp.email_address,
                    'login_type'    : userResp.user_type,                  
                } 
                var jwtToken = await commonFunction.createToken(userdtls); 
                response_status.msg = 'Token Generated Successfully';
                response_status.action_status = true;                   
                response_dataset.token = jwtToken;
                response_dataset.token_type = 'Bearer';
 
 
                response_data.dataset = response_dataset;
                response_data.status = response_status;
                            
                res.status(200);
                res.send({ response: response_data });
            }else{
                response_status.msg = 'Something Went Wrong.';
                response_status.action_status = false;
                response_data.dataset = response_dataset;
                response_data.status = response_status;
 
                res.status(400);
                res.send({ response: response_data });
            }
        }else{
            response_status.msg = 'Record Not Found.';
            response_status.action_status = false;
            response_data.dataset = response_dataset;
            response_data.status = response_status;
 
            res.status(400);
            res.send({ response: response_data });
        }
    } catch (e) {
         response_status.msg = 'Something went wrong';
         response_status.action_status = false;
         response_data.dataset = response_dataset;
         response_data.status = response_status;
 
         res.status(500);
         res.send({ response: response_data });
    }
 }