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
