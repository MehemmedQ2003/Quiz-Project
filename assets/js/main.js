document.addEventListener('DOMContentLoaded', function () {
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach(function (popoverTriggerEl) {
        new bootstrap.Popover(popoverTriggerEl);
    });

    // Example of dynamically showing content based on login status
    const isLoggedIn = false; // Change this value based on login status

    if (isLoggedIn) {
        document.getElementById('loggedOutContent').style.display = 'none';
        document.getElementById('loggedInContent').style.display = 'block';
    }
});