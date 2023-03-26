// Define the API endpoint URL
const API_ENDPOINT = "https://taranjeetsinghkalsi.github.io/Find-Your-Doctor/doctorsdata.json";

// Get a reference to the template
const doctorTemplate = document.querySelector("#doctor-template");

// Get a reference to the container where the doctor cards will be inserted
const doctorsContainer = document.querySelector("#doctor-container");

// Fetch the data from the API endpoint
fetch(API_ENDPOINT)
  .then((response) => response.json())
  .then((data) => {
    // Loop through the data and create a doctor card for each item
    data.forEach((doctor) => {
      // Clone the template to create a new instance of the doctor card
      const doctorCard = doctorTemplate.content.cloneNode(true);

      // Populate the fields in the doctor card with data from the API
      doctorCard.querySelector(".Doctors").classList.add(doctor.speciality);
      doctorCard.querySelector(".doctor-name").textContent = doctor.name;
      doctorCard.querySelector(".doctor-speciality").textContent =
        doctor.speciality;
      doctorCard.querySelector(".doctor-experience").textContent =
        doctor.experience;
      doctorCard.querySelector(".doctor-location").textContent =
        doctor.location;
        doctorCard.querySelector(".doctor-directions").href =
        doctor.directions;
        doctorCard.querySelector(".doctor-phone").href =
        doctor.phone;

      // Set the image source to the URL of the doctor's photo
      const doctorImage = doctorCard.querySelector(".doctor-image");
      doctorImage.src = doctor.image;
      doctorImage.alt = `Photo of Dr. ${doctor.name}`;
      

      // Add the doctor card to the container
      doctorsContainer.appendChild(doctorCard);
    });

  })
  .catch((error) => {
    console.error("Error fetching doctors data:", error);
  });

const specialitySearchInput = document.querySelector(".speciality-search");
const areaSearchInput = document.querySelector(".area-search");

const noResultFound= document.getElementById("no-result-found");
var specialDoctors;
specialitySearchInput.addEventListener("input", e => {
    const doctors = document.querySelectorAll(".Doctors");
    const value = e.target.value;
    doctors.forEach(doctor => {
        if (doctor.classList.contains(value))
            doctor.classList.add("visible");
        else doctor.classList.remove("visible");
    });
    specialDoctors = document.querySelectorAll(".visible");
});

areaSearchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    var noResult=true;
    specialDoctors.forEach(specialDoctors => {
        var areaName = specialDoctors.querySelector(".area-name").textContent.toLowerCase();
        if (areaName.includes(value)){
            specialDoctors.classList.add("visible");
            noResult=false;
        }
        else 
            specialDoctors.classList.remove("visible");        
    });

    if(noResult){
        noResultFound.classList.add("visible");
    } else noResultFound.classList.remove("visible");
});
