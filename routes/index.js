var express = require('express');
var router = express.Router();

//The entry point for requiring a module. Handles app startup, routing, and other modules. 
//Not necessary for Nodejs. This file can be deleted. 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Invoq Health' });
});

/* GET Userlist page. */
//Not entirely needed. Can delete
router.get('/userlist', function(req, res) {
    var db = req.db;
    //var doctors = db.get('usercollection');
    var str = db.collection('usercollection').find({},{full_name: 1, email: 1, age: 1, Hospital: 1, Specialty: 1}, function(err,result){
    	if (err) throw err;
    	res.render('userlist',{
    		"userlist" : result
    	});
    });



});


/* GET New User page. */
//Can delete
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */

router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


module.exports = router;