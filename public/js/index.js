// make sure the user does not enter spaces for certain fields
// make sure the user password length is atleast 8
// lost password handling
// session storage for JWT

// need to make integration with flash messages?

function messageWrapper(message) {
	return `<p>${message}</p>`;
}

function renderStatusMessage(status, message) {
	const html = messageWrapper(message);
	$('#status').removeClass('success');
	$('#status').removeClass('warning');
	$('#status').removeClass('error');

	$('#status').addClass(status);

	$('#status').empty().append(html);
	setTimeout(function() {
		$('#status').empty();
	}, 6000);
}

function successSignUp(data) {
	console.log(data);
	let message = `Welcome ${data.firstName}!
		Your account has been created. Please login to start tracking your games.`;
	renderStatusMessage('success', message);
	window.location = '/login';
}

function errorSignUp(data) {
	console.log(data);
	let message = data.responseJSON.message;
	renderStatusMessage('error', message);
}

// This redirects the page on successful login to the game lists
function successLogin(data) {
	console.log(data);
	if (typeof data.redirect == 'string') {
		window.location = data.redirect;
	}
	//let message = `Welcome ${data.user.firstName}! Redirecting you to the app.`;
	//renderStatusMessage('success', message);
}

function errorLogin(data) {
	// let message;
	// if (data.status == 401) {
	// 	message = `Uh oh...Looks like you have entered the wrong credentials. Please enter them again.`;
	// } else {
	// 	message = 'Uh oh...Something went wrong.'
	// }
	// renderStatusMessage('error', message);
}

function listenToLoginFormSubmit() {
	// captures the information and submits it via AJAX to the endpoints
	// let user know that it has been submitted successfully
	
	$('#loginForm').on('submit', (event) => {
		console.log('login form submitted');
		let data = $('#loginForm').serializeArray().reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		}, {});
		console.log({
			listenToLoginFormSubmit: data
		});
		event.preventDefault();
		data = JSON.stringify(data);
		ajaxCall('/api/auth/login', data, 'post', successLogin, errorLogin);
	});
}

function listenToSignUpFormSubmit() {
	console.log('running');
	// captures the information and submits it via AJAX to the endpoints
	// Then updates the screen to let the user know that it has been submitted successfully
	$('#registerForm').on('submit', (event) => {
		event.preventDefault();
		console.log('register submit');
		let data = $('#registerForm').serializeArray().reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		}, {});
		data = JSON.stringify(data);
		ajaxCall('/api/users', data, 'post', successSignUp, errorSignUp);
	});
}

function ajaxCall(endpoint, data, type, successCallback, errorCallback) {
	$.ajax({
		url: endpoint,
		data: data,
		contentType: 'application/json',
		traditional: true,
		type: type,
		success: function(data) {
			successCallback(data);
			console.log(data);
		},
		error: function(data) {
			errorCallback(data);
			console.log(data);
		}
	});
}

function listenToForgetPasswordClick() {
	// captres the information and sends it via AJAX to the endpoints
	// need to create an endpoint that receives information and sends a email to the user
}

function listenToSignUpClick() {
	// renders the sign up form to the user
	$('.container').on('click', '#signUpLink', (event) => {
		window.location = '/signup';
		// event.preventDefault();
		// renderSignUpForm();
	});
}

function renderSignUpForm() {
	const form = returnSignUpFormHTML();
	$('#formContainer').empty().append(form);
}

function listenToLoginClick() {
	console.log({listenToLoginClick: 'loading'});
	$('.container').on('click', '#loginLink', (event) => {
		console.log({listenToLoginClick: 'clicked'});
		// event.preventDefault();
		// renderLoginForm();
		window.location = '/login';
	});
}

// function renderLoginForm() {
// 	const form = returnLoginFormHTML();
// 	$('#formContainer').empty().append(form);
// }

function returnLoginFormHTML() {
	return `
		<form id="loginForm">
			<label for="username">Username</label>
			<input id="username" type="text" name="username" required>
			<label for="password">Password</label>
			<input id="password" type="password" name="password" required>
			<a id="forgotPasswordLink" href="#">Forgot your password?</a>
			<button type="submit">Login</button>
		</form>
		<a id="signUpLink">New here? Sign Up!</a>`;
}

function returnSignUpFormHTML() {
	return `
	<form id="registerForm">
		<label for="firstName">First Name</label>
		<input id="firstName" type="text" name="firstName" required>
		<label for="lastName">Last Name</label>
		<input id="lastName" type="text" name="lastName" required>
		<label for="email">Email</label>
		<input id="email" type="email" name="email" required>
		<label for="username">Username</label>
		<input id="username" type="text" name="username" required>		
		<label for="password">Password</label>
		<input id="password" type="password" name="password" required>
		<button type="submit">Sign Up</button>
	</form>
	<a id="loginLink">Already have an account? Login!</a>`;

}

function initializeIndex() {
	listenToLoginClick();
	listenToSignUpClick();
	listenToForgetPasswordClick();
	listenToLoginFormSubmit();
	listenToSignUpFormSubmit();
}

$(initializeIndex);