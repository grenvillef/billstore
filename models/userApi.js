var db=require('../dbconnection');

var user={

	getUserByEmail: function(email,callback){
 		console.log('in getUserByEmail:'+email);
		return  db.query("select * from Customers where CustEmailAddress = ?",[email], callback);
	},

	 getUserById: function(id,callback){
 		console.log('in getUserById:'+id);

                return  db.query("select * from Customers where CustomerId = ?",[id], callback);
        },
	
	createUser: function(newUser,callback){
                return db.query("insert into Customers SET ?",[newUser], callback);
        },
	createGoogleUser: function(newUser,callback){
 		console.log('in createGoogleUser'+newUser);

                return db.query("insert into Customers SET ?",[newUser], callback);
        }

};

module.exports = user;
