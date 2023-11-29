function submitForm() {
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const aadharNumber = document.getElementById('aadharNumber').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const photographURL = document.getElementById('photographURL').value;

    // Check if any required field is empty
    if (!fullName || !phoneNumber || !aadharNumber || !gender || !age || !photographURL) {
        alert('Please fill in all required fields.');
        return;
    }

    const selectedGender = gender.value;

    // Create data object
    const formData = {
        driverId: aadharNumber,
        name: fullName,
        phoneNumbers: phoneNumber,
        age: age,
        gender: selectedGender,
        image: photographURL
    };

    fetch('https://garbage-collect-backend.onrender.com/send-driver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log('Failed Data:', formData);
        });
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

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function logout() {
    deleteCookie("authToken");
    window.location.href = "../index.html";
}

window.onload = function () {
    var authToken = getCookie("authToken");
    if (!authToken) {
        window.location.href = "../index.html";
    }
};

function redirectToHome() {
    window.location.href = 'home.html';
}
