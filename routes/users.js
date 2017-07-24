var express = require('express');
var router = express.Router();

//users accesses the database. Called by global. 



//taking from the database stored at userlist
router.get('/userlist', function(req,res){
	var db = req.db;
    var str = db.collection('usercollection').find({},{full_name: 1, email: 1, age: 1, hospital: 1, stage: 1, relation: 1, entry_date: 1, admitted_doctor: 1, last_visit: 1, notes: 1}, function(err,results){
		res.json(results);
	});
});

router.post('/adduser', function(req,res){
	var db = req.db;
	var str = db.get('usercollection');
	str.insert(req.body, function(err, results){
		console.log('inserting into database');
		if (err != null){
			console.log(req.body);
			res.send("error in adding user");
		}
		else{
			console.log(req.body);
			console.log('Inserted into Database');
		} 
			
	});
});


/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
