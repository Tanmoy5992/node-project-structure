const jwt = require('jsonwebtoken');

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