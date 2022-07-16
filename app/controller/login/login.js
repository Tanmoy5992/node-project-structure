const  UserModel  = require('../../model/test');

exports.register =  async (req, res) => {

    var response_status = {};
    var response_dataset = {};
    var response_data = {};
    try {
        const addObj = {
            userName:req.body.username,
            password:req.body.password,
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
        var pageLimit = req.body.limit;
        if ((pageLimit == '') || (pageLimit == null) || (pageLimit == 'undefined')) {
            pageLimit = parseInt(10);
        }else{
            pageLimit = parseInt(pageLimit);
        }
        var pageNo = req.body.pageno;
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
                if(faqDtlsArray.length > 0){
                    var itemCount = data.count;   
                    var pageCount  =  Math.ceil(itemCount / pageLimit); 
                    faqDtlsArray.forEach(element => {
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
                    response_status.action_status = false;
                    response_data.dataset = response_dataset;
                    response_data.totalItemCount = 0;
                    response_data.status = response_status;

                    res.status(200);
                    res.send({ response: response_data });
                }
        } else {
            response_status.msg = 'No Record Found.';                
            response_status.action_status = false;
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