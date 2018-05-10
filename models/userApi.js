var db=require('../dbconnection');

var user={

	getUserByEmail: function(email,callback){

		console.log(email);
 		return  db.query("select * from Customers where CustEmailAddress = ?",[email], callback);
	},
	
	createUser: function(newUser,callback){

/*
var newUser = {
 CustomerId:       '3',
 UserID     :      'test user 1',
 CustFirstName:    'Grenville',
 CustLastName  :   'Fernandes',
 CustNamePrefix:  'Mr',
 CustEmailAddress: email,
 CustAddressLine1: 'Cust Address Line 1',
 CustAddressLine2: 'Cust Address Line 2',
 CustAddressLine3: 'Cust Address Line 3' ,
 CustCountryCode:  'NL',
 CustZipCode:	'1183II'   ,
 CustCity       : 'Amsterdam',
 CustState      : 'NH',
 CustType       : 'Basic',
PASSWORD: password
};
*/
		console.log(newUser);
                return db.query("insert into Customers SET ?",[newUser], callback);
        }

};

module.exports = user;
