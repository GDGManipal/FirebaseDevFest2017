var config = {
    apiKey: "AIzaSyAkpDeRtBFftrEpdQTXx_FYfsE-RmYJ16c",
    authDomain: "devfest-2dadc.firebaseapp.com",
    databaseURL: "https://devfest-2dadc.firebaseio.com",
    projectId: "devfest-2dadc",
    storageBucket: "devfest-2dadc.appspot.com",
    messagingSenderId: "417837573400"
};
firebase.initializeApp(config);

$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

$("#login").on('click', function(ev){
	ev.preventDefault();
	let email = $("#email").val();
	let password = $("#password").val();

	firebase.auth().signInWithEmailAndPassword(email, password).then(function(status){
		toastr.success('Successful!');
	})
	.catch(function(error) {
	  // Handle Errors here.
	  
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

	console.log(email + password + confirm);

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