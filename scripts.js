function setCookie(name, value, minutes) {
    var expires = "";
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function authenticate(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Make an API request for authentication
    fetch("https://garbage-collect-backend.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Login successful") {
                // Set a cookie for successful login that expires in 1 minute
                setCookie("authToken", "your_token", 1);

                // Redirect to www.google.com
                window.location.href = "./pages/AdminPage.html";
            } else {
                alert("Invalid credentials");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Check if the user is already logged in (e.g., on page load)
window.onload = function () {
    var authToken = getCookie("authToken");
    if (authToken) {
        // User is logged in, redirect to www.google.com
        window.location.href = "./pages/AdminPage.html";
    }
};
