// Create login handler

const loginFormHandler = async (e) => {
    e.preventDefault();

    // collect values from the login form
    const email = $("#email-login").val().trim();
    const password = $("password-login").val().trim();

    if(email && password) {
        // send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
            method: POST,
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            // if successful, redirect the browser to the homepage
            document.location.replace('/')
        } else {
            alert(`Failed to login, please try again!`,response.statusText);
        }
    }
};

