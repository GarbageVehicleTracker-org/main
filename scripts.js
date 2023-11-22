// Declare submitButton outside createCard function
let submitButton;

// Function to create a card
function createCard(vehicle, driverData, areaData) {
  const card = document.createElement("div");
  card.classList.add("card");

  // First section: Vehicle ID
  const idSection = document.createElement("div");
  idSection.classList.add("card-section");
  const idText = document.createElement("div");
  idText.classList.add("card-id"); // Add this class for identifying vehicle ID
  idText.textContent = `Vehicle ID: ${vehicle.id}`;
  idSection.appendChild(idText);
  card.appendChild(idSection);

  // Second section: Select boxes
  const dropdownSection = document.createElement("div");
  dropdownSection.classList.add("card-section");

  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown-container");

  // Create the first dropdown and populate it with driver names
  const dropdown1 = createDropdown("Driver", driverData.map(driver => driver.name));
  dropdown1.classList.add("driver-dropdown"); // Add this class for identifying driver dropdown
  dropdownContainer.appendChild(dropdown1);

  // Create the second dropdown and populate it with area names
  const dropdown2 = createDropdown("Area", areaData);
  dropdown2.classList.add("area-dropdown"); // Add this class for identifying area dropdown
  dropdownContainer.appendChild(dropdown2);

  dropdownSection.appendChild(dropdownContainer);
  card.appendChild(dropdownSection);

  // Third section: Submit button
  const submitSection = document.createElement("div");
  submitSection.classList.add("card-section");

  const cardSubmitButton = document.createElement("button");
  cardSubmitButton.textContent = "Submit";
  cardSubmitButton.classList.add("submit-btn");
  cardSubmitButton.disabled = true; // Disable the button by default

  // Attach a click event listener to the submit button
  cardSubmitButton.addEventListener("click", () => {
    // Implement the logic to send data to the API here
    console.log("Submitting data:", {
      id: vehicle.id,
      driver: dropdown1.value,
      area: dropdown2.value,
    });

    // Disable selected options on other cards
    disableSelectedOptions(vehicle.id, dropdown1.value, dropdown2.value);

    // Disable submit button and dropdowns for the clicked card
    cardSubmitButton.disabled = true;
    dropdown1.disabled = true;
    dropdown2.disabled = true;

    // Change text and style for the clicked card's submit button
    cardSubmitButton.textContent = "Submitted";
    cardSubmitButton.style.backgroundColor = "white";
    cardSubmitButton.style.color = "green";
  });

  submitSection.appendChild(cardSubmitButton);
  card.appendChild(submitSection);

  // Event listener for dropdown1
  dropdown1.addEventListener("change", () => {
    updateSubmitButtonStatus();
  });

  // Event listener for dropdown2
  dropdown2.addEventListener("change", () => {
    updateSubmitButtonStatus();
  });

  // Function to update the submit button status
  function updateSubmitButtonStatus() {
    cardSubmitButton.disabled = !(dropdown1.value && dropdown2.value);
  }

  return card;
}

// Function to create a dropdown
function createDropdown(label, options) {
  const dropdown = document.createElement("select");
  const labelElement = document.createElement("label");

  labelElement.textContent = label;
  labelElement.setAttribute("for", label.toLowerCase().replace(/\s/g, "-"));

  dropdown.id = label.toLowerCase().replace(/\s/g, "-");

  // Add an initial blank option
  const blankOption = document.createElement("option");
  blankOption.value = ""; // Set value as appropriate
  blankOption.textContent = ""; // Set text content as appropriate
  dropdown.appendChild(blankOption);

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    dropdown.appendChild(optionElement);
  });

  return dropdown;
}

// Function to disable selected options on other cards
function disableSelectedOptions(vehicleId, selectedDriver, selectedArea) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Skip the card that was just submitted
    if (card.querySelector('.card-id').textContent === `Vehicle ID: ${vehicleId}`) {
      return;
    }

    const dropdown1 = card.querySelector('.driver-dropdown');
    const dropdown2 = card.querySelector('.area-dropdown');

    // Disable selected driver and area options on other cards
    disableOption(dropdown1, selectedDriver);
    disableOption(dropdown2, selectedArea);
  });
}

// Function to disable a specific option in a dropdown
function disableOption(dropdown, optionValue) {
  const options = dropdown.options;

  for (let i = 0; i < options.length; i++) {
    if (options[i].value === optionValue) {
      options[i].disabled = true;
      break;
    }
  }
}

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
