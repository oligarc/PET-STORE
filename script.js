import { PetList } from "./petList.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully-loaded");

  //const petList = []; //Array where Im gonna have my pets. Instead of this Im gonna use an instance of my petList class

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

    return isValid;
  }

  function checkEmptyInputs(input) {
    return input.value.trim().length > 0;
  }

  function checkImageUrl(url) {
    const trimmedUrl = url.trim(); // Elimina espacios al principio y al final
    const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    return imagePattern.test(trimmedUrl);
  }

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

  function markFieldAsNotValid(element, message) {
    const errorMessage = element.parentNode.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    element.classList.add("is-not-valid-field");
  }

  function markFieldAsValid(element) {
    element.parentNode.classList.remove("is-not-valid-field");
  }

  function renderPets(petList) {
    const div = document.querySelector(".pet-list");
    div.innerHTML = "";
    petList.forEach((pet) => {
      const petItem = document.createElement("div");
      petItem.classList.add("card", "mt-2");
      petItem.style.width = "20%";
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
              pet.code
            }">Delete Pet</button>
            <button class="btn btn-info mt-2">Edit Pet</button>
        </div>
      `;
      div.appendChild(petItem);
    });

    const deleteButtons = div.querySelectorAll("button.btn-danger");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const petCode = event.target.getAttribute("data-pet-code");
        console.log("Deleting pet with code:", petCode);
        deletePet(petCode);
      });
    });
  }

  function deletePet(petCode) {
    console.log("Deleting pet with code:", petCode);
    petListInstance.deletePet(petCode);
    renderPets(petListInstance.readPets());
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
      renderPets(petListInstance.readPets());
      console.log(petListInstance);
    } else {
      console.log("Form is not valid.");
    }
  });
});
