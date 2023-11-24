function setCookie(name, value, hours) {
  var expires = "";
  if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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
              // Set a cookie for successful login that expires in 24 hours
              setCookie("authToken", "your_token", 24);

              // Redirect to www.google.com
              window.location.href = "https://www.google.com";
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
      window.location.href = "https://www.google.com";
  }
};