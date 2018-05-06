var db=require('../dbconnection');

var invoiceApi={

	getAllInvoices: function(callback){
		console.log("in invoiceapi");
 		return db.query("select * from Invoices", callback);
	},

	getInvoiceByCustomer: function(customerId, callback){
		return db.query("select * from Invoices, Customer_Invoice_Master where Invoices.InvoiceId = Customer_Invoice_Master.InvoiceId and CustomerId = ?",[customerId],callback);
	}
};

module.exports = invoiceApi;
