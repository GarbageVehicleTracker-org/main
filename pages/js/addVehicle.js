function saveData() {
    const noValue = document.getElementById('noInput').value;
    const modelValue = document.getElementById('modelInput').value;
    const sizeValue = document.getElementById('sizeInput').value;
    const capacityValue = document.getElementById('capacityInput').value;

    // Validate input (you can add more sophisticated validation)
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

    // Send data to the backend API (you need to implement the backend)
    sendDataToBackend(data);
}

function sendDataToBackend(data) {
    // Assuming you have a backend API endpoint (replace URL accordingly)
    const apiUrl = 'http://34.163.209.106:5500/send-vehicle';

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
        console.log(responseData)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to save data. Please try again.');
    });
}