var db=require('../dbconnection');

//insert into Invoices(InvoiceNumber,InvoiceDate, SubTotalAmount, CurrencyCode, InvoiceStatus, StoreId, TotalShippingPrice, TotalAmount, TotalTaxAmount, BarCode, RefundByDate) Values ('0000000003', NOW(), 150.00, 'EUR', 'PAID', '1',10.00,140.00, 21.00, '1234567890456', NOW() + INTERVAL 30 DAY);

var postInvoiceApi={


	createInvoice: function(customerId, callback){
console.log("reached post");

 //		return db.query("select * from Invoices", callback);
return db.query("insert into Invoices(InvoiceNumber,InvoiceDate, SubTotalAmount, CurrencyCode, InvoiceStatus, StoreId, TotalShippingPrice, TotalAmount, TotalTaxAmount, BarCode, RefundByDate) Values ('0000000003', NOW(), 150.00, 'EUR', 'PAID', '1',10.00,140.00, 21.00, '1234567890456', NOW() + INTERVAL 30 DAY", callback);

	},

};

module.exports = postInvoiceApi;
