var db=require('../dbconnection');

var uploadInvoice={

	createInvoice: function(req,callback){

                var result = db.query("insert into Invoices SET ?",[req.body], callback);
                if (err)
	                res.json(err);
        
		else
			sendEmail.invoiceUpload('grenville@gmail.com',function(err){
			if (err)
				res.json(err);
			});

        	return result; 

	}
};

module.exports = uploadInvoice;
