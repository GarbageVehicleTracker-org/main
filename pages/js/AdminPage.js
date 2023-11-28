// Function to create a card
function createCard(area, vehicleData, driverData) {
  // Create the main card container
  const card = document.createElement("div");
  card.classList.add("card");

  // First section: Area Name
  const areaSection = document.createElement("div");
  areaSection.classList.add("card-section");
  const areaText = document.createElement("div");
  areaText.classList.add("card-area");
  areaText.textContent = `Area: ${area.name}`;
  areaSection.appendChild(areaText);
  card.appendChild(areaSection);

  // Second section: Select boxes
  const selectSection = document.createElement("div");
  selectSection.classList.add("card-section");

  const dropdownContainer1 = document.createElement("div");
  dropdownContainer1.classList.add("dropdown-container1");
  const dropdown1 = createDropdown("Vehicle", vehicleData.map(vehicle => vehicle.id));
  dropdown1.classList.add("vehicle-dropdown");
  dropdownContainer1.appendChild(dropdown1);

  const dropdownContainer2 = document.createElement("div");
  dropdownContainer2.classList.add("dropdown-container2");
  const dropdown2 = createDropdown("Driver", driverData.map(driver => driver.name));
  dropdown2.classList.add("driver-dropdown");
  dropdownContainer2.appendChild(dropdown2);

  selectSection.appendChild(dropdownContainer1);
  selectSection.appendChild(dropdownContainer2);
  card.appendChild(selectSection);

  // Third section: Submit button
  const submitSection = document.createElement("div");
  submitSection.classList.add("card-section");

  const cardSubmitButton = document.createElement("button");
  cardSubmitButton.textContent = "Submit";
  cardSubmitButton.classList.add("submit-btn");
  cardSubmitButton.disabled = true;

  cardSubmitButton.addEventListener("click", () => {
    const requestData = {
      areaId: area.areaId || area.name,
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

    disableSelectedOptions(area.areaId || area.name, dropdown1.value, dropdown2.value);

    cardSubmitButton.disabled = true;
    dropdown1.disabled = true;
    dropdown2.disabled = true;

    cardSubmitButton.textContent = "Submitted";
    cardSubmitButton.style.backgroundColor = "white";
    cardSubmitButton.style.color = "green";
  });

  submitSection.appendChild(cardSubmitButton);
  card.appendChild(submitSection);

  dropdown1.addEventListener("change", () => {
    updateSubmitButtonStatus();
    setCookie(`vehicle_${area.name}`, dropdown1.value, 30);
  });

  dropdown2.addEventListener("change", () => {
    updateSubmitButtonStatus();
    setCookie(`driver_${area.name}`, dropdown2.value, 30);
  });

  function updateSubmitButtonStatus() {
    cardSubmitButton.disabled = !(dropdown1.value && dropdown2.value);
  }

  // Retrieve and set saved values from cookies
  const savedVehicleValue = getCookie(`vehicle_${area.name}`);
  const savedDriverValue = getCookie(`driver_${area.name}`);

  if (savedVehicleValue) {
    dropdown1.value = savedVehicleValue;
  }

  if (savedDriverValue) {
    dropdown2.value = savedDriverValue;
  }

  updateSubmitButtonStatus();

  return card;
}

function createDropdown(label, options) {
  const dropdown = document.createElement("select");
  const labelElement = document.createElement("label");

  labelElement.textContent = label;
  labelElement.setAttribute("for", label.toLowerCase().replace(/\s/g, "-"));

  dropdown.id = label.toLowerCase().replace(/\s/g, "-");

  const blankOption = document.createElement("option");
  blankOption.value = "";
  blankOption.textContent = "";
  dropdown.appendChild(blankOption);

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    dropdown.appendChild(optionElement);
  });

  return dropdown;
}

function getDriverIdByName(driverData, driverName) {
  const selectedDriver = driverData.find(driver => driver.name === driverName);
  return selectedDriver ? selectedDriver.driverId : '';
}

function disableSelectedOptions(area, selectedVehicle, selectedDriver) {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    if (card.querySelector('.card-area').textContent === `Area: ${area}`) {
      return;
    }

    const dropdown1 = card.querySelector('.vehicle-dropdown');
    const dropdown2 = card.querySelector('.driver-dropdown');

    disableOption(dropdown1, selectedVehicle);
    disableOption(dropdown2, selectedDriver);
  });
}

function disableOption(dropdown, optionValue) {
  const options = dropdown.options;

  for (let i = 0; i < options.length; i++) {
    if (options[i].value === optionValue) {
      options[i].disabled = true;
      break;
    }
  }
}

fetch("https://garbage-collect-backend.onrender.com/get-driver")
  .then(response => response.json())
  .then(driverData => {
    fetch("https://garbage-collect-backend.onrender.com/get-vehicle")
      .then(response => response.json())
      .then(vehicleData => {
        fetch("https://garbage-collect-backend.onrender.com/get-all-areas")
          .then(response => response.json())
          .then(areaData => {
            const mainSection = document.getElementById("main-section");

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

document.getElementById('addDriver').addEventListener('click', function () {
  var targetUrl = "./addDriver.html";
  window.location.href = targetUrl;
});

document.getElementById('addVehicle').addEventListener('click', function () {
  var targetUrl = "./addVehicle.html";
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

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function logout() {
  deleteCookie("authToken");
  window.location.href = "../index.html";
}

window.onload = function () {
  var authToken = getCookie("authToken");
  if (!authToken) {
    window.location.href = "../index.html";
  }
};

function redirectToHome() {
  window.location.href = 'home.html';
}
