//GO TO FIREBASE CONSOLE, MAKE A NEW PROJECT AND COPY PASTE THE CONFIG HERE



let auth = null;



var database = firebase.database();

let listener = firebase.database().ref('messages');
function populate()
{
	
	// $(".messages").append('<div class="bubble"><span id="emailBubble">' + data.val().email + '</span><br>' + data.val().message + '</div>')
	//FUNCTION TO POPULATE MESSAGES AND IMAGES.
		
}

function runScript(e) {
	if (e.keyCode == 13) {
		if($("#message").val() === '')
		{
			toastr.error('Message can\'t be empty')
		}
		else
		{
			let pushMessages = firebase.database().ref('messages').push();
			let message = $("#message").val();
			
			//FUNCTION TO ADD MESSAGES TO THE DATABASE

			$("#message").val('');
		}

	}
}




$('.toggle').on('click', function() {
	$('.container').stop().addClass('active');
});

$('.close').on('click', function() {
	$('.container').stop().removeClass('active');
});

// var provider = new firebase.auth.GoogleAuthProvider();
// 		firebase.auth().signInWithPopup(provider);

$("#login").on('click', function(ev){
	ev.preventDefault();
	let email = $("#email").val();
	let password = $("#password").val();

	//FIREBASE LOGIN CODE
})

$("#register").on('click', function(ev){
	ev.preventDefault();
	let email = $("#emailReg").val();
	let password = $("#passReg").val();
	let confirm = $("#confirmPassReg").val();

	//FIREBASE REGISTRATION CODE HERE. CHECK PASSWORD AND CONFIRM PASSWORD
});


$("#uploadFile").on('click', function(ev){
	$("#files").click();
})

$("#files").change(function(){
	let file = this.files;
	let storageRef = firebase.storage().ref();
	let name = file[0].name + Date.now()
	let images = storageRef.child(name);

	//FIREBASE UPLOAD FILE HERE.
})

