var db=require('../dbconnection');

var bankTransactions={

	getBankTransactions: function(customerId, callback){

		var result =  db.query("select * from BankTransactions where CustomerId = ?",[customerId],callback);
		console.log(result.rows);
		return result;
	}
};

module.exports = bankTransactions;
