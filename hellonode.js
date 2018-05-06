//Load HTTP module
var http = require("http");
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
var message;
con.query(sql, function (err, result) {
    if (err) throw err;
	message = result;
});


//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
	response.writeHead(200, {'Content-Type': 'text/html'});

 	response.write("</tr>");
    	for(var row in message){
 		response.write("<tr>");
            	for(var column in message[row]){
                	response.write("<td><label>" + message[row][column] + "</label></td>");       
            	}
 		response.write("</tr>");
	}      
   // Send the response body "Hello World"
//   response.end(JSON.stringify(message.toString()));
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/')
