function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch data from the API
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it further if needed
    }
}

// Fetch driver data
const driverId = getQueryParameter('driverId');
fetchData(`https://garbage-collect-backend.onrender.com/get-driver/${driverId}`)
    .then(data => {
        document.getElementById('driver-image').src = data.image;
        document.getElementById('driver-name').innerText = `Name: ${data.name}`;
        document.getElementById('driver-age').innerText = `Age: ${data.age}`;
        document.getElementById('driver-gender').innerText = `Gender: ${data.gender}`;
        document.getElementById('driver-id').innerText = `Driver ID: ${data.driverId}`;
        document.getElementById('driver-phone').innerText = `Phone: ${data.phoneNumbers}`;
    })
    .catch(error => console.error('Error fetching driver data:', error));

// Fetch vehicle data
const vehicleNo = getQueryParameter('vehicleNo');
fetchData(`https://garbage-collect-backend.onrender.com/get-vehicle/${vehicleNo}`)
    .then(data => {
        document.getElementById('vehicle-id').innerText = `Vehicle ID: ${data.id}`;
        document.getElementById('vehicle-registration').innerText = `Registration No: ${data.registrationNo}`;
        document.getElementById('vehicle-type').innerText = `Type: ${data.type}`;
        document.getElementById('vehicle-capacity').innerText = `Capacity: ${data.capacity}`;
    })
    .catch(error => console.error('Error fetching vehicle data:', error));

// Add click event to the track button
document.getElementById('track-button').addEventListener('click', function () {
    // Extract the area ID from the URL
    const areaId = getQueryParameter('areaId');
    const vehicleId = getQueryParameter('vehicleNo');

    // Redirect to the tracking page with the areaId as a query parameter
    window.location.href = `TrackingPage.html?areaId=${areaId}&vehicleId=${vehicleId}`;
});
function goBack() {
    window.history.back();
}