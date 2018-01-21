// make sure the user does not enter spaces for certain fields
// make sure the user password length is atleast 8
// lost password handling
// session storage for JWT



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
	let message = `Welcome ${data.firstName}!
		Your account has been created. Please login to start tracking your games.`;
	renderLoginForm();
	renderStatusMessage('success', message);
}

function errorSignUp(data) {
	let message = data.responseJSON.message;
	renderStatusMessage('error', message);
}

function successLogin(data) {
	let message = `Welcome ${data.user.firstName}! Redirecting you to the app.`;
	renderStatusMessage('success', message);
}

function errorLogin(data) {
	let message;
	if (data.status == 401) {
		message = `Uh oh...Looks like you have entered the wrong credentials. Please enter them again.`;
	} else {
		message = 'Uh oh...Something went wrong.'
	}
	renderStatusMessage('error', message);
}

function listenToLoginFormSubmit() {
	// captures the information and submits it via AJAX to the endpoints
	// let user know that it has been submitted successfully
	$('#formContainer').on('submit', '#loginForm', (event) => {
		let data = $('#loginForm').serializeArray().reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		}, {});
		event.preventDefault();
		data = JSON.stringify(data);
		ajaxCall('/api/auth/login', data, 'post', successLogin, errorLogin);
	});
}

function listenToSignUpFormSubmit() {
	// captures the information and submits it via AJAX to the endpoints
	// Then updates the screen to let the user know that it has been submitted successfully
	$('#formContainer').on('submit', '#registerForm', (event) => {
		let data = $('#registerForm').serializeArray().reduce(function(obj, item) {
		    obj[item.name] = item.value;
		    return obj;
		}, {});
		data = JSON.stringify(data);
		event.preventDefault();
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
		},
		error: function(data) {
			errorCallback(data);
		}
	});
}

function listenToForgetPasswordClick() {
	// captres the information and sends it via AJAX to the endpoints
	// need to create an endpoint that receives information and sends a email to the user
}

function listenToSignUpClick() {
	// renders the sign up form to the user
	$('#formContainer').on('click', '#signUpLink', (event) => {
		event.preventDefault();
		renderSignUpForm();
	});
}

function renderSignUpForm() {
	const form = returnSignUpFormHTML();
	$('#formContainer').empty().append(form);
}

function listenToLoginClick() {
	$('#formContainer').on('click', '#loginLink', (event) => {
		event.preventDefault();
		renderLoginForm();
	});
}

function renderLoginForm() {
	const form = returnLoginFormHTML();
	$('#formContainer').empty().append(form);
}

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