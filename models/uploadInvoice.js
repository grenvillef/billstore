var db=require('../dbconnection');

var uploadInvoice={

	createInvoice: function(req,callback){
                var result = db.query("insert into Invoices SET ?",[req.body], callback);
        	return result; 
	}

};

module.exports = uploadInvoice;
