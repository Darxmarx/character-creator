// login handler

const loginFormHandler = async (e) => {
    e.preventDefault();

    // collect values from the login form
    const email = $("#email-login").val().trim();
    const password = $("password-login").val().trim();

    if(email && password) {
        // send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            // if successful, redirect the browser to the homepage
            document.location.replace('/');
        } else {
            alert(`Failed to login, please try again!`,response.statusText);
        }
    }
};

// signup handler to create a new user account

const signupFormHandler = async (e) => {
    e.preventDefault();

    // get user input value from signup form
    const name = $("#name-signup").val().trim();
    const email = $("#email-signup").val().trim();
    const password = $("#password-signup").val().trim();

    if(name && email && password) {
        // send a POST request to API
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        }) 

        if(response.ok) {
            // if successful, redirect the browser to homepage
            document.location.replace('/');
        } else {
            alert(`Please enter correct info to sign up!`, response.statusText);
        }
    }
};

$('.login-form').on('submit', loginFormHandler);
$('.signup-form').on('submit', signupFormHandler);