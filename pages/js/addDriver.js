function submitForm() {
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const aadharNumber = document.getElementById('aadharNumber').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.getElementById('age').value;
    const photographURL = document.getElementById('photographURL').value;
  
    // Create data object
    const formData = {
      driverId:aadharNumber,
      name: fullName,
      phoneNumbers: phoneNumber,
      age: age,
      gender: gender,
      image: photographURL
    };
  
    // Make a POST request to the API endpoint
    fetch('http://34.163.209.106:5500/send-driver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success, e.g., show a success message to the user
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log('Failed Data:', formData);
      // Handle errors, e.g., show an error message to the user
    });
  }