var db=require('../dbconnection');

var uploadInvoice={

	createInvoice: function(invoice,callback){
                return db.query("insert into Invoices SET ?",[invoice], callback);
        }

};

module.exports = uploadInvoice;
