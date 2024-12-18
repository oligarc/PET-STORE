import { PetList } from "./petList.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully-loaded");

  //That array is deprecated because instead I used a general class that stores an array with CRUD methods
  //const petList = []; //Array where Im gonna have my pets. Instead of this Im gonna use an instance of my petList class

  //This is the instance of the new class
  const petListInstance = new PetList();

  //Capturing the inputs

  const petForm = document.getElementById("petForm");
  const petName = document.getElementById("petName");
  const petDescription = document.getElementById("petDesc");
  const petUrl = document.getElementById("petUrl");
  const petBirthday = document.getElementById("petbirth");
  const petPrice = document.getElementById("petPrice");
  const petCode = document.getElementById("petCode");
  const sold = document.getElementById("petSold");

  //Capturing inputs for editing

  const editFormContainer = document.getElementById("editFormContainer");
  const editPetForm = document.getElementById("editPetForm");
  const editPetName = document.getElementById("editPetName");
  const editDescription = document.getElementById("editDescription");
  const editPetUrl = document.getElementById("editPetUrl");
  const editBirth = document.getElementById("editBirth");
  const editPetPrice = document.getElementById("editPetPrice");
  const editPetSold = document.getElementById("editPetSold");
  const editPetCode = document.getElementById("editPetCode");

  //Im taking the button see-pets to show them, I also need the container where I'm showing the pets in orden to make a display none and display block
  const seePetsButton = document.getElementById("see-pets");
  const petListContainer = document.querySelector(
    ".row.justify-content-center.align-items-center.pet-list"
  );

  //Functions to validate the form, when isValid = true, we can submit it.
  function validateForm() {
    let isValid = true;

    if (!checkEmptyInputs(petName)) {
      markFieldAsNotValid(petName, "Name cannot be empty");
      isValid = false;
    } else {
      markFieldAsValid(petName);
    }

    if (!checkEmptyInputs(petDescription)) {
      markFieldAsNotValid(petDescription, "Description cannot be empty");
      isValid = false;
    } else {
      markFieldAsValid(petDescription);
    }

    let urlIsValid = true;

    if (!checkEmptyInputs(petUrl)) {
      markFieldAsNotValid(petUrl, "URL cannot be empty");
      isValid = false;
      urlIsValid = false;
    } else {
      markFieldAsValid(petUrl);
    }

    if (urlIsValid && !checkImageUrl(petUrl.value)) {
      markFieldAsNotValid(
        petUrl,
        "Image URL must be a valid .jpg, .jpeg, .png, or .gif file"
      );
      isValid = false;
    } else {
      markFieldAsValid(petUrl);
    }

    let birthdayIsValid = true;

    if (!checkEmptyInputs(petBirthday)) {
      markFieldAsNotValid(petBirthday, "Pet birthday cannot be empty");
      isValid = false;
      birthdayIsValid = false;
    } else {
      markFieldAsValid(petBirthday);
    }

    if (birthdayIsValid && !checkFuture(petBirthday.value)) {
      markFieldAsNotValid(petBirthday, "Your pet cannot be from the future");
      isValid = false;
    } else {
      markFieldAsValid(petBirthday);
    }

    if (isNaN(petPrice.value) || petPrice.value <= 0) {
      markFieldAsNotValid(petPrice, "Pet price must be a positive number");
      isValid = false;
    } else {
      markFieldAsValid(petPrice);
    }

    if (!checkEmptyInputs(petCode)) {
      markFieldAsNotValid(petCode, "Petcode input cannot be empty");
      isValid = false;
    } else {
      markFieldAsValid(petCode);
    }

    if (!checkCodePet(petCode)) {
      markFieldAsNotValid(
        petCode,
        "Petcode needs to be formed by three leters and three numbers"
      );
      isValid = false;
    } else {
      markFieldAsValid(petCode);
    }

    return isValid;
  }

  //Checking any input of the form is not empty
  function checkEmptyInputs(input) {
    return input.value.trim().length > 0;
  }

  //Checking the url input uses that extensions
  function checkImageUrl(url) {
    const trimmedUrl = url.trim(); // Elimina espacios al principio y al final
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    return imagePattern.test(trimmedUrl);
  }

  //Function to check we don't have a time traveller pet

  function checkFuture(birthdate) {
    const bir = new Date(birthdate);
    const today = new Date();

    if (bir.getFullYear() > today.getFullYear()) {
      return false;
    } else if (bir.getFullYear() === today.getFullYear()) {
      if (bir.getMonth() > today.getMonth()) {
        return false;
      } else if (bir.getMonth() === today.getMonth()) {
        if (bir.getDate() > today.getDate()) {
          return false;
        }
      }
    }
    return true;
  }

  //Need to make a method to test that petCode are only formed by three leters and three numbers
  //Have to use a regex

  function checkCodePet(petCode) {
    const codePattern = /^[A-Za-z]{3}\d{3}$/; //Check notes because I won't remember how to do this in 2 days
    return codePattern.test(petCode.value);
  }

  function markFieldAsNotValid(element, message) {
    const errorMessage = element.parentNode.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    element.classList.add("is-not-valid-field");
  }

  function markFieldAsValid(element) {
    const errorMessage = element.parentNode.querySelector(".error-message");
    errorMessage.style.display = "none";
    element.classList.remove("is-not-valid-field");
  }

  //This is gonna render the container in the HTML
  function renderPets(petList) {
    const div = document.querySelector(
      ".row.justify-content-center.align-items-center.pet-list"
    ); //If you have two or more classes that's the way to get it with querySelector
    div.innerHTML = "";
    petList.forEach((pet) => {
      const petItemContainer = document.createElement("div");
      petItemContainer.classList.add("col-12", "col-md-6", "col-lg-3", "mb-4");

      const petItem = document.createElement("div");
      petItem.classList.add("card", "mt-2", "h-100");
      petItem.innerHTML = `<img class="card-img-top" src="${
        pet.imageUrl
      }" alt="Title" />
        <div class="card-body">
            <h4 class="card-title">Name: ${pet.petName}</h4>
            <p class="card-text" style="font-weight: bold;">Description: <span> ${
              pet.description
            } </span></p>
            <p class="card-text" style="font-weight: bold;">Price: <span> ${
              pet.price
            } € but it has no price </span></p>
            <p class="card-text" style="font-weight: bold;">Birthday: <span> ${
              pet.birthday
            } </span></p>
            <p class="card-text" style="font-weight: bold;">Code: <span> ${
              pet.code
            } </span> </p>
            <p class="card-text" style="font-weight: bold;">Has any owner? : <span> ${
              pet.sold
                ? "Of course. It's mine"
                : "It hadn't any owner until now"
            }</span></p>
            <button class="btn btn-danger mt-2" data-pet-code="${
              //data-pet-code is gonna store the petcode for each pet
              pet.code
            }">Delete Pet</button>
            <button class="btn btn-info mt-2" data-code="${
              pet.code
            }">Edit Pet</button>
        </div>
      `;
      petItemContainer.appendChild(petItem);
      div.appendChild(petItemContainer);
    });

    //onclick wasn't working so I added a click event listener, when you push in that button, it gets the petCode and proceeds to delete the pet
    const deleteButtons = div.querySelectorAll("button.btn-danger");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const petCode = event.target.getAttribute("data-pet-code"); //Gets the petCode to delete the pet with that code
        console.log("Deleting pet with code:", petCode);
        deletePet(petCode);
        renderPets(petListInstance.readPets());
      });
    });

    const editButtons = div.querySelectorAll("button.btn-info");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const petCode = event.target.getAttribute("data-code");
        const petToEdit = petListInstance
          .readPets()
          .find((pet) => pet.code === petCode);

        editPetName.value = petToEdit.petName;
        editDescription.value = petToEdit.description;
        editPetUrl.value = petToEdit.imageUrl;
        editBirth.value = petToEdit.birthday;
        editPetPrice.value = petToEdit.price;
        editPetSold.checked = petToEdit.sold;
        editPetCode.value = petToEdit.code;

        editFormContainer.style.display = "block";
      });
    });
  }

  editPetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedPet = {
      petName: editPetName.value,
      description: editDescription.value,
      imageUrl: editPetUrl.value,
      birthday: editBirth.value,
      price: parseFloat(editPetPrice.value),
      code: editPetCode.value,
      sold: editPetSold.checked,
    };
    petListInstance.editPet(updatedPet);
    renderPets(petListInstance.readPets());

    // hide the editForm
    editFormContainer.style.display = "none";
  });

  //The pets are gonna be shown only when I want it.
  seePetsButton.addEventListener("click", (event) => {
    petListContainer.style.display = "inline-flex"; //This over here took me like 2 hours MAAAAAAAAAAAAAAAAAAAAAAAN
    renderPets(petListInstance.readPets());
  });

  function deletePet(petCode) {
    console.log("Deleting pet with code:", petCode);
    petListInstance.deletePet(petCode);
    //renderPets(petListInstance.readPets());
  }

  petForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      const newPet = {
        petName: petName.value,
        description: petDescription.value,
        imageUrl: petUrl.value,
        birthday: petBirthday.value,
        price: parseFloat(petPrice.value),
        code: petCode.value,
        sold: sold.checked,
      }; //Adding a new pet object once the form is validated

      //petList.push(newPet);
      petListInstance.addPet(newPet);
      console.log("Pet added succesfully");
      //renderPets(petListInstance.readPets());
      console.log(petListInstance);
    } else {
      console.log("Form is not valid.");
    }
  });
});
