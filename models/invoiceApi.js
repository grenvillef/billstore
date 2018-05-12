var db=require('../dbconnection');

var invoiceApi={

	getAllInvoices: function(callback){
 		return db.query("select * from Invoices", callback);
	},

	getInvoiceByCustomer: function(customerId, callback){

		var result =  db.query("select * from Invoices where CustomerId = ?",[customerId],callback);
		return result;
	}
};

module.exports = invoiceApi;
