// Fetch driver data
fetch('https://garbage-collect-backend.onrender.com/get-driver/696969')
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
fetch('https://garbage-collect-backend.onrender.com/get-vehicle/WB68A2395')
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
    // Add your tracking logic here
    alert('Tracking...');
});