
var mysql = require('mysql');
const util = require('util');

var connection = mysql.createConnection({
  host: "billstoredevdb.ckdsg1xslfrp.eu-west-3.rds.amazonaws.com",
  user: "grenville",
  password: "GUNUferns01",
  database:"billstoredevdb"
});

module.exports=connection;

//con.connect(function(err) {
 // if (err) throw err;
//  console.log("Connected!");
//});

//var  sql = "select * from bdb.Invoices, bdb.Customer_Invoice_Master where Invoices.InvoiceId = Customer_Invoice_Master.InvoiceId and CustomerId = '1';";

//con.query(sql, function (err, result) {
//    if (err) throw err;
//	 console.log(result);

   	//console.log("Result: " + result);
 
