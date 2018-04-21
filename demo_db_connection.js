
var mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gunuferns"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var  sql = "select * from bdb.Invoices, bdb.Customer_Invoice_Master where Invoices.InvoiceId = Customer_Invoice_Master.InvoiceId and CustomerId = '1';";

con.query(sql, function (err, result) {
    if (err) throw err;
	 console.log(result);

   	//console.log("Result: " + result);
}); 
