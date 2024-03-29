const  UserModel  = require('../../model/user');
const  UserRoleModel  = require('../../model/user.role');
const  commonFunction  = require('../../../helper/commonfunction');

exports.login = async (req, res) => {
    var response_status = {};
    var response_dataset = []
    var response_data = {};  

    try {
        var username  	= req.body.username;
        var password 	= req.body.password;        
        let userRecord 	= await UserModel.findByAny({where:{'userName':username}});

        if(userRecord){
            var userDtls = userRecord.dataValues;
			if(userDtls == null){
				response_status.msg = 'Record Not Found.';
                response_status.action_status = true;
                response_data.dataset = response_dataset;
                response_data.status = response_status;               

                res.status(200);
                res.send({ response: response_data });
			} else {

                var hash = userDtls.password;  
                if(await commonFunction.comparePassword(password, hash) == true){
                    var userdtls  = {
                        'id' 	   : userDtls.userID,
                        'username' : userDtls.userName			 		
                    }

                    let Record      = {	'id' : userDtls.userID, 'username' : userDtls.userName};					 	
                    var jwtToken 	= await commonFunction.createToken(userdtls); 

                    response_status.msg = 'Logged in successfully';
                    response_status.action_status = true;	
                    response_dataset = Record;					
                    response_dataset.token = jwtToken;
                    response_dataset.token_type = 'Bearer';
                    response_data.dataset = response_dataset;
                    response_data.status = response_status;
		                    
                    res.status(200);
                    res.send({ response: response_data });
                }else{
                    response_status.msg = 'Password is incorrect.';
                    response_status.action_status = false;
                    response_data.dataset = response_dataset;
                    response_data.status = response_status;               

                    res.status(400);
                    res.send({ response: response_data });
                }

            }
        } else {
            response_status.msg = 'Username or password is incorrect.';
            response_status.action_status = false;
            response_data.dataset = response_dataset;
            response_data.status = response_status;               

            res.status(400);
            res.send({ response: response_data });
        }
    } catch (e) {

        response_status.msg = 'Something went wrong.';                
        response_status.action_status = false;
        response_data.dataset = response_dataset;
        response_data.status = response_status;

        res.status(500);
        res.send({ response: response_data });
    }
    
}

exports.register =  async (req, res) => {

    var response_status = {};
    var response_dataset = []
    var response_data = {};
    try {
        var hashPassword = await commonFunction.hashPassword(req.body.password);

        const addObj = {
            userName:req.body.username,
            password:hashPassword,
            verified:true
        }
        const data = await UserModel.addNewRecord(addObj);
        response_status.msg = 'Registration successful.';
        response_dataset.id = data.dataValues.userID;
        response_dataset.username = data.dataValues.userName;
        response_status.action_status = true;
        response_data.dataset = response_dataset;
        response_data.status = response_status;
    
        res.status(200);
        res.send({ response: response_data });
    } catch (e) {
        response_status.msg = 'Something went wrong.';                
        response_status.action_status = false;
        response_data.dataset = response_dataset;
        response_data.totalItemCount = 0;
        response_data.status = response_status;

        res.status(500);
        res.send({ response: response_data });
    }
}

exports.getAllUser =  async (req, res) => {
    var response_status = {};
    var response_dataset = [];
    var response_data = {};
    var array_list = [];
    var search_str = "";

    try {
        var pageLimit = req.query.limit;
        if ((pageLimit == '') || (pageLimit == null) || (pageLimit == 'undefined')) {
            pageLimit = parseInt(10);
        }else{
            pageLimit = parseInt(pageLimit);
        }
        var pageNo = req.query.pageno;
        if ((pageNo == '') || (pageNo == null) || (pageNo == 'undefined')) {
        pageNo = 1;
        }else{
        pageNo = parseInt(pageNo);
        }

        if (pageNo == 1) {
        var offset = 0;
        } else {
        var offset = (pageNo - 1) * pageLimit;
        }

        if(typeof(req.body.search_val) !='undefined'){
            let searchvalue = req.body.search_val;
            search_str = searchvalue.trim();
        }

        const data = await UserModel.getAllRecord(search_str, pageLimit, offset);

        if(data){
            var faqDtlsArray = data.rows;
            //console.log('faqDtlsArray',faqDtlsArray)
                if(faqDtlsArray.length > 0){
                    var itemCount = data.count;   
                    var pageCount  =  Math.ceil(itemCount / pageLimit); 
                    faqDtlsArray.forEach(async (element) => {
                        var item = {
                            'id': element.userID,
                            'username': element.userName
                        }
                        array_list.push(item);
                
                    });
                    response_status.msg = 'User list fetched successfully.';
                    response_status.action_status = true;
                    response_data.dataset = array_list;
                    response_data.totalItemCount = itemCount;
                    //response_data.search_str= search_str;
                    response_data.status = response_status;

                    res.status(200);
                    res.send({ response: response_data });
                }else{
                    response_status.msg = 'No Record Found.';                
                    response_status.action_status = true;
                    response_data.dataset = response_dataset;
                    response_data.totalItemCount = 0;
                    response_data.status = response_status;

                    res.status(200);
                    res.send({ response: response_data });
                }
        } else {
            response_status.msg = 'No Record Found.';                
            response_status.action_status = true;
            response_data.dataset = response_dataset;
            response_data.totalItemCount = 0;
            response_data.status = response_status;

            res.status(200);
            res.send({ response: response_data });
        }
    } catch (e){

        response_status.msg = 'Something went wrong.';                
        response_status.action_status = false;
        response_data.dataset = response_dataset;
        response_data.totalItemCount = 0;
        response_data.status = response_status;

        res.status(500);
        res.send({ response: response_data });
    }
    
}

exports.updateUser =  async (req, res) => {
    var response_status = {};
    var response_dataset = [];
    var response_data = {};

    try {
        var login_id = req.body.loginDetails.id;
        var userData = {						
            'firstName': req.body.firstName
        };
        var whereObj = {
            where : {'userID': login_id}
        }
        let updatesdRecord = await UserModel.updateAnyRecord(userData, whereObj);
        console.log(' updatesdRecord.dataValues', updatesdRecord)
        if(updatesdRecord){	                        	
            response_status.msg = 'User updated successfully.';
            response_status.action_status = true;
            // response_dataset.id = updatesdRecord.dataValues.userID;
            // response_dataset.username = updatesdRecord.dataValues.userName;
            // response_dataset.firstName = updatesdRecord.dataValues.firstName;
            response_data.dataset = response_dataset;
            response_data.status = response_status;

            res.status(200);
            res.send({ response: response_data });

        }else{
            response_status.msg = 'Something went wrong, please try again.';
            response_status.action_status = false;
            response_data.dataset = response_dataset;
            response_data.status = response_status;
            
            res.status(500);
            res.send({ response: response_data });
        } 
    } catch (e) {
        console.log(e)
        response_status.msg = 'Something went wrong, please try again.';
        response_status.action_status = false;
        response_data.dataset = response_dataset;
        response_data.status = response_status;
        
        res.status(500);
        res.send({ response: response_data });
    }
    
}

exports.userRoles = async (req,res) => {

    try{
        let userRoleRecord 	= await UserModel.findAllData();
        //console.log('userRoleRecord',userRoleRecord)
        res.json(userRoleRecord );
    } catch (e) {
        console.log(e)
        res.json({err:'userRoleRecord'} );
    }
    
}

exports.testTransaction = async (req,res) => {
    let dbTransaction = await sequelize.transaction();
    try {
        var hashPassword = await commonFunction.hashPassword('test');

        const addObj = {
            userName:'req.body.username1',
            password:hashPassword,
            verified:true
        }
        const data = await UserModel.addNewRecord(addObj,dbTransaction);

        const roleData = await UserRoleModel.addNewRecord({testId:data.test});
        await dbTransaction.commit();
        res.json({ok:'ok'} );
    } catch (e) {
        if(dbTransaction){
            await dbTransaction.rollback();
        }        
        console.log(e)
        res.json({err:'error'} );
    }
    
}