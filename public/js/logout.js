// logout and redirect to homepage
const logout = async () => {
    // send a POST request to API endpoint
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // if successful redirect to homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

$('#logoutBtn').on('click', logout);
