// Fetch driver data from the API
fetch("https://garbage-collect-backend.onrender.com/get-driver")
  .then(response => response.json())
  .then(driverData => {
    // Fetch vehicle data from the API
    fetch("https://garbage-collect-backend.onrender.com/get-vehicle")
      .then(response => response.json())
      .then(vehicleData => {
        // Fetch area data from the API
        fetch("https://garbage-collect-backend.onrender.com/get-all-areas")
          .then(response => response.json())
          .then(areaData => {
            const mainSection = document.getElementById("main-section");

            // Iterate through the vehicle data and create cards
            vehicleData.forEach(vehicle => {
              const card = createCard(vehicle, driverData, areaData);
              mainSection.appendChild(card);
            });
          })
          .catch(error => console.error("Error fetching area data:", error));
      })
      .catch(error => console.error("Error fetching vehicle data:", error));
  })
  .catch(error => console.error("Error fetching driver data:", error));

// Function to create a card
function createCard(vehicle, driverData, areaData) {
  const card = document.createElement("div");
  card.classList.add("card");

  const idText = document.createElement("div");
  idText.textContent = vehicle.id;
  card.appendChild(idText);

  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown-container");

  // Create the first dropdown and populate it with driver names
  const dropdown1 = createDropdown("Driver", driverData.map(driver => driver.name));
  dropdownContainer.appendChild(dropdown1);

  // Create the second dropdown and populate it with area names
  const dropdown2 = createDropdown("Area", areaData);
  dropdownContainer.appendChild(dropdown2);

  card.appendChild(dropdownContainer);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.classList.add("submit-btn");

  // Attach a click event listener to the submit button
  submitButton.addEventListener("click", () => {
    // Implement the logic to send data to the API here
    console.log("Submitting data:", {
      id: vehicle.id,
      driver: dropdown1.value,
      area: dropdown2.value,
    });
  });

  card.appendChild(submitButton);

  return card;
}

// Function to create a dropdown
function createDropdown(label, options) {
  const dropdown = document.createElement("select");
  const labelElement = document.createElement("label");

  labelElement.textContent = label;
  labelElement.setAttribute("for", label.toLowerCase().replace(/\s/g, "-"));

  dropdown.id = label.toLowerCase().replace(/\s/g, "-");

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    dropdown.appendChild(optionElement);
  });

  return dropdown;
}

// Dummy function for button clicks
function dummyButtonClick() {
  alert("Button clicked (dummy action)!");
}
