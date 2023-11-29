function saveData() {
    const noValue = document.getElementById('noInput').value;
    const modelValue = document.getElementById('modelInput').value;
    const sizeValue = document.getElementById('sizeInput').value;
    const capacityValue = document.getElementById('capacityInput').value;

    // Validate input 
    if (!noValue || !modelValue || !sizeValue || !capacityValue) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a data object
    const data = {
        id: noValue,
        registrationNo: modelValue,
        type: sizeValue,
        capacity: parseInt(capacityValue),
    };

    sendDataToBackend(data);
}

function sendDataToBackend(data) {
    const apiUrl = 'https://garbage-collect-backend.onrender.com/send-vehicle';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            alert('Data saved successfully!');
            console.log(responseData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to save data. Please try again.');
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

function goBack() {
    window.history.back();
}