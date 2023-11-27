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
