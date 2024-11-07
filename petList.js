//CREATE A PETLIST CLASS AND ITS METHODS

//ADD, UPDATE, DELETE

//WHEN THE LIST IS SHOWED YOU HAVE TO CREATE AN EDIT AND DELETE BUTTON

export class PetList {
  constructor() {
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
    //this.renderPets(); Shouldn't render when a pet is added
  }

  deletePet(codePet) {
    this.pets = this.pets.filter((pet) => pet.code !== codePet);
    // this.renderPets(); Shouldn't render when a pet is deleted
  }

  readPets() {
    //When using this function I should have a button that shows the list but have to get to there
    return this.pets;
  }

  /*renderPets() {
    const div = document.querySelector(".pet-list");
    div.innerHTML = "";
    this.pets.forEach((pet) => {
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
            <button class="btn btn-danger mt-2" onclick="deletePet(${
              pet.code
            })">Delete Pet</button>
            <button class="btn btn-danger mt-2">Edit Pet</button>
        </div>
      `;
      div.appendChild(petItem);
    });
  }
    */
}
