//Global takes care of the ajax calls and connecting the jade html file with the database interactions

// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

   // Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

	$('#btnAddUser').on('click', addUser);

	$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

   // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {
	console.log('Table populating');
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

    	userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.full_name + '">' + this.full_name + '</a></td>';
            tableContent += '<td>' + this.entry_date + '</td>';
            tableContent += '<td>' + this.admitted_doctor + '</td>'
            tableContent += '<td>' + this.last_visit + '</td>'
            tableContent += '<td>' + this.notes + '</td>'
            tableContent += '<td>' + this._id + '</td>'
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};


// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem){ 
    	return arrayItem.full_name; 
    }).indexOf(thisUserName);
    
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.full_name);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoHospital').text(thisUserObject.hospital);
    $('#userInfoStage').text(thisUserObject.stage);
    $('#userInfoRelation').text(thisUserObject.relation);
    $('#userInfoEmail').text(thisUserObject.email);

};


function addUser(event){
	console.log('call to add user event');
	event.preventDefault();
	var errorCount = 0;
	$('#addUser input').each(function(index,val){
		if($(this).val() === ''){
			errorCount++;
		}
	});

	if (errorCount === 0){
		  var newUser = {
            'full_name': $('#addUser fieldset input#inputUserFullname').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'hospital': $('#addUser fieldset input#inputUserHospital').val(),
            'stage': $('#addUser fieldset input#inputUserStage').val(),
            'relation' : $('#addUser fieldset input#inputUserRelation').val(),
            'entry_date' : $('#addUser fieldset input#inputUserEntryDate').val(),
            'admitted_doctor' : $('#addUser fieldset input#inputUserAdmittedDoctor').val(),
            'last_visit' : $('#addUser fieldset input#inputUserLastVisit').val(),
            'notes' : $('#addUser fieldset input#inputUserNotes').val()
       	}
       	console.log(newUser.Hospital);

    	console.log('ajax up next');

    	//None of the done functions for the ajax are working. Do not know why.

		$.ajax({
			type: "POST",
			url:'/users/adduser',
			data:newUser,
			dataType:'JSON',
		});

		populateTable();
		$('#addUser fieldset input').val('');


		console.log('add user finished');
	};
};


function deleteUser(event){
	event.preventDefault();
	var confirmation = confirm("Are you sure you want to delete this user?");

	if (confirmation === true){

		//None of the done functions for the ajax are working. Do not know why.
		$.ajax({
			type: 'DELETE',
			url: '/users/deleteuser/' + $(this).attr('rel')
		});

		populateTable();
	}
	else{

		return false;
	}
};