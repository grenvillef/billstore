var db=require('../dbconnection');

var user={

	getUserByEmail: function(email,callback){
 		return  db.query("select * from Customers where CustEmailAddress = ?",[email], callback);
	},

	 getUserById: function(id,callback){
                return  db.query("select * from Customers where CustomerId = ?",[id], callback);
        },
	
	createUser: function(newUser,callback){
                return db.query("insert into Customers SET ?",[newUser], callback);
        },
	createGoogleUser: function(newUser,callback){
                return db.query("insert into Customers SET ?",[newUser], callback);
        }

};

module.exports = user;
