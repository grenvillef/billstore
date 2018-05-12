var db=require('../dbconnection');

var uploadInvoice={

	createInvoice: function(req,callback){
                var result = db.query("insert into Invoices SET ?",[req.body], callback);
                result = db.query("update Invoices SET CustomerId = ?",[req.user[0].CustomerId], callback);
        	return result; 
	}

};

module.exports = uploadInvoice;
