
var db=require('../dbconnection');

var invoiceDetails={

	getAllInvoiceDetails: function(callback){
 		return db.query("select * from Invoice_Lines", callback);
	},

	getDetailsByInvoice: function(InvoiceId, callback){
		return db.query("select * from Invoice_Lines where InvoiceId = ?",[InvoiceId],callback);
	}
};

module.exports = invoiceDetails;
