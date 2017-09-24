var config = {
	apiKey: "AIzaSyAkpDeRtBFftrEpdQTXx_FYfsE-RmYJ16c",
	authDomain: "devfest-2dadc.firebaseapp.com",
	databaseURL: "https://devfest-2dadc.firebaseio.com",
	projectId: "devfest-2dadc",
	storageBucket: "devfest-2dadc.appspot.com",
	messagingSenderId: "417837573400"
};
firebase.initializeApp(config);

let auth = null;



var database = firebase.database();

let listener = firebase.database().ref('messages');
function populate()
{
	listener.on('child_added', function(data) {
		if(data.val().message !== '')
			$(".messages").append('<div class="bubble"><span id="emailBubble">' + data.val().email + '</span><br>' + data.val().message + '</div>')
		else
		{
			let storageRef = firebase.storage().ref();

			var starsRef = storageRef.child('' + data.val().attachment);

			starsRef.getDownloadURL().then(function(url) {
				$(".messages").append('<div class="bubble"><span id="emailBubble">' + data.val().email + '</span><br><img src="' + url + '" /></div>');
			}).catch(function(error) {
			});
			
		}
	});
}

function runScript(e) {
	if (e.keyCode == 13) {

		let pushMessages = firebase.database().ref('messages').push();
		let message = $("#message").val();
		pushMessages.set({
			email: auth.currentUser.email,
			message: message,
			attachment: null
		});

		$("#message").val('');

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

	firebase.auth().signInWithEmailAndPassword(email, password).then(function(status){
		auth = firebase.auth();
		toastr.success('Successful!');
		$(".loginRegister").fadeOut(800).promise().done(function(){
			$(".chat").fadeIn();
			populate();
		});

	})
	.catch(function(error) {
	  
	  
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  toastr.error(errorMessage);
	});
})

$("#register").on('click', function(ev){
	ev.preventDefault();
	let email = $("#emailReg").val();
	let password = $("#passReg").val();
	let confirm = $("#confirmPassReg").val();

	

	if(password === confirm)
	{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(user){
			toastr.success('Registered successfully!');

		})
		.catch(function(error) {

			var errorCode = error.code;
			var errorMessage = error.message;
			toastr.error(errorMessage);
		});
	}
	else
		toastr.error('Passwords do not match.');
});


$("#uploadFile").on('click', function(ev){
	$("#files").click();
})

$("#files").change(function(){
	let file = this.files;
	let storageRef = firebase.storage().ref();
	let name = file[0].name + Date.now()
	let images = storageRef.child(name);

	images.put(file[0]).then(function(snapshot){
		let pushMessages = firebase.database().ref('messages').push();
		
		pushMessages.set({
			email: auth.currentUser.email,
			message: '',
			attachment: name
		});
		console.log('Done');
	})
})

