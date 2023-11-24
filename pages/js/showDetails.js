// Function to extract query parameters from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch driver data
const driverId = getQueryParameter('driverId');
fetch(`https://garbage-collect-backend.onrender.com/get-driver/${driverId}`)
    .then(response => response.json())
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
fetch(`https://garbage-collect-backend.onrender.com/get-vehicle/${vehicleNo}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('vehicle-id').innerText = `Vehicle ID: ${data.id}`;
        document.getElementById('vehicle-registration').innerText = `Registration No: ${data.registrationNo}`;
        document.getElementById('vehicle-type').innerText = `Type: ${data.type}`;
        document.getElementById('vehicle-capacity').innerText = `Capacity: ${data.capacity}`;
    })
    .catch(error => console.error('Error fetching vehicle data:', error));

// Add click event to the track button
document.getElementById('track-button').addEventListener('click', function() {
    // Extract the area ID from the URL
    const areaId = getQueryParameter('areaId');

    // Redirect to TrackingPage.html with vehicle ID and area ID as query parameters
    window.location.href = `TrackingPage.html?vehicleId=${vehicleNo}&areaId=${areaId}`;
});

