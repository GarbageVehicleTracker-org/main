// Function to create a card
function createCard(area, vehicleData, driverData) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    // First section: Area Name
    const idSection = document.createElement("div");
    idSection.classList.add("card-section");
    const idText = document.createElement("div");
    idText.classList.add("card-id"); // Add this class for identifying area name
    idText.textContent = `Area: ${area.name}`; // Display area name
    idSection.appendChild(idText);
    card.appendChild(idSection);
  
    // Second section: Select boxes
    const dropdownSection = document.createElement("div");
    dropdownSection.classList.add("card-section");
  
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown-container");
  
    // Create the first dropdown and populate it with vehicle IDs
    const dropdown1 = createDropdown("Vehicle", vehicleData.map(vehicle => vehicle.id));
    dropdown1.classList.add("vehicle-dropdown"); // Add this class for identifying vehicle dropdown
    dropdownContainer.appendChild(dropdown1);
  
    // Create the second dropdown and populate it with driver names
    const dropdown2 = createDropdown("Driver", driverData.map(driver => driver.name));
    dropdown2.classList.add("driver-dropdown"); // Add this class for identifying driver dropdown
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
      // Implement the logic to send data to the assigned-work API here
      const requestData = {
        areaId: area.areaId || area.name, // Use areaId if available, otherwise use name
        vehicleId: dropdown1.value,
        driverId: getDriverIdByName(driverData, dropdown2.value),
      };
  
  
      fetch("https://garbage-collect-backend.onrender.com/assign-work", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Response from assigned-work API:", data);
        })
        .catch(error => console.error("Error submitting data:", error));
  
      // Disable selected options on other cards
      disableSelectedOptions(area.areaId || area.name, dropdown1.value, dropdown2.value);
  
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
  
  // Function to get driver ID by name
  function getDriverIdByName(driverData, driverName) {
    const selectedDriver = driverData.find(driver => driver.name === driverName);
    return selectedDriver ? selectedDriver.driverId : '';
  }
  
  // Function to disable selected options on other cards
  function disableSelectedOptions(area, selectedVehicle, selectedDriver) {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      // Skip the card that was just submitted
      if (card.querySelector('.card-id').textContent === `Area: ${area}`) {
        return;
      }
  
      const dropdown1 = card.querySelector('.vehicle-dropdown');
      const dropdown2 = card.querySelector('.driver-dropdown');
  
      // Disable selected vehicle and driver options on other cards
      disableOption(dropdown1, selectedVehicle);
      disableOption(dropdown2, selectedDriver);
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
  
              // Iterate through the area data and create cards
              areaData.forEach(area => {
                const card = createCard(area, vehicleData, driverData);
                mainSection.appendChild(card);
              });
            })
            .catch(error => console.error("Error fetching area data:", error));
        })
        .catch(error => console.error("Error fetching vehicle data:", error));
    })
    .catch(error => console.error("Error fetching driver data:", error));
  
    document.getElementById('addDriver').addEventListener('click', function() {
      // Specify the URL you want to redirect to
      var targetUrl = "./pages/addDriver.html";
  
      // Redirect to the specified URL
      window.location.href = targetUrl;
    });
  
    document.getElementById('addVehicle').addEventListener('click', function() {
      // Specify the URL you want to redirect to
      var targetUrl = "./pages/addVehicle.html";
  
      // Redirect to the specified URL
      window.location.href = targetUrl;
    });

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

  function deleteCookie(name) {
      document.cookie = name + '=; Max-Age=-99999999;';
  }

  function logout() {
    // Delete the authToken cookie
    deleteCookie("authToken");

    // Redirect to the login page (index.html)
    window.location.href = "../index.html";
}

window.onload = function () {
  var authToken = getCookie("authToken");
  if (!authToken) {
      // User is not logged in, redirect to login page
      window.location.href = "../index.html";
  }
};
