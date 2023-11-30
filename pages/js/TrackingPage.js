function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch dustbins data from the API
function fetchDustbinsData() {
    return fetch('https://garbage-collect-backend.onrender.com/get-all-areas')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching dustbins data:', error);
            return [];
        });
}

// Function to update the dustbin tracking UI
function updateTrackingUI(data) {
    // Find the area with the given areaId
    const area = data.find(area => area.areaId === areaId);

    if (area) {
        // Dynamically add cards based on the dustbins in the area
        let trackContainer = document.getElementById('trackContainer');
        trackContainer.innerHTML = ''; // Clear previous content

        area.dustbins.forEach((dustbin, index) => {
            // Create a card element
            let card = document.createElement('div');
            card.className = 'card';

            // Create status elements
            let statusContainer = document.createElement('div');
            statusContainer.className = 'status';

            let arrivedStatus = document.createElement('p');
            arrivedStatus.className = 'arrived';

            if (dustbin.isVisited) {
                arrivedStatus.textContent = `Arrived at ${new Date(dustbin.visitedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;



            } else {
                arrivedStatus.textContent = 'Not Arrived Yet';
            }

            statusContainer.appendChild(arrivedStatus);

            // Create circle element
            let circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.backgroundColor = dustbin.isVisited ? '#4CAF50' : 'rgb(161, 161, 161)';

            // Append status and circle elements to the card
            card.appendChild(statusContainer);
            card.appendChild(circle);

            // Append the card to the track container
            trackContainer.appendChild(card);

            // Log the dustbin coordinates and isVisited status
            console.log(`Dustbin ${index + 1} Coordinates:`, dustbin.coordinates);
            console.log(`Dustbin ${index + 1} isVisited:`, dustbin.isVisited);
        });

    } else {
        console.error('Area not found with areaId:', areaId);
    }
}

// Get areaId from the URL
const areaId = getQueryParameter('areaId');

// Fetch the initial dustbins data
fetchDustbinsData()
    .then(data => {
        updateTrackingUI(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Set up interval to fetch data every 1 second
setInterval(() => {
    fetchDustbinsData()
        .then(data => {
            updateTrackingUI(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}, 1000);

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
