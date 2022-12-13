const elInputAdditem = document.querySelector("#todo");
const elAddBtn = document.querySelector(".btn-add");
const elInputWarning = document.querySelector(".warning");
const closeWarningMenuBtn = document.querySelector(".btn-warning-remove");
const elListsActive = document.querySelector(".list-active");
const elFilterSearch = document.querySelector("#filter");
const elOverlay = document.querySelector(".overlay");
const elModal = document.querySelector(".modal");
const elCancel = document.querySelector("#cancel");
const saveChangeBtn = document.querySelector("#change");
const elCompletedList = document.querySelector(".list-completed");

let array = JSON.parse(localStorage.getItem("item"))
  ? JSON.parse(localStorage.getItem("item"))
  : [];

//  <i class="fas fa-check fa-check-active"></i>

const renderElement = (array) => {
  elListsActive.textContent = "";
  array.forEach((item) => {
    const list = document.createElement("li");
    list.className = "list-item";
    list.innerHTML = `
    <span class="left-side">
    <button class="btn btn-check buttons btn-check-active">
      
    </button>
    <span class="text">${item.item}</span>
    <textarea cols="25" rows="3" class="li-text-edit"></textarea>
    </span>
    <span class="right-side">
      <button class="btn btn-edit" data-id="${item.id}">edit</button>
      <button class="btn btn-remove" data-id="${item.id}">del</button>
    </span>
    `;
    elListsActive.appendChild(list);
    elInputAdditem.value = "";
  });
};

renderElement(array);

// add Posts
const addItem = () => {
  let inputValue = elInputAdditem.value;
  if (inputValue === "") {
    elInputWarning.classList.add("show");
    return;
  }
  const newItem = {
    id: Math.round(Math.random() * 100),
    item: elInputAdditem.value,
  };
  array.push(newItem);
  localStorage.setItem("item", JSON.stringify(array));
  renderElement(array);
};

//open modal
const addModal = () => {
  elOverlay.classList.add("active");
  elModal.classList.add("active");
};

//open modal
const closeModal = () => {
  elOverlay.classList.remove("active");
  elModal.classList.remove("active");
};

// delete Items
elListsActive.addEventListener("click", (e) => {
  const event = e.target;
  if (event.matches(".btn-remove")) {
    const id = event.dataset.id;
    console.log(id);
    const filteredArr = array.filter((item) => {
      if (item.id != id) {
        return item;
      }
    });
    array = filteredArr;
    localStorage.setItem("item", JSON.stringify(array));
    renderElement(array);
  }

  //edit
  if (event.matches(".btn-edit")) {
    const id = event.dataset.id;
    const elEditInput = document.querySelector(".modal-input");
    addModal();

    array.forEach((item, i) => {
      if (item.id === Number(id)) {
        elEditInput.value = item.item;

        saveChangeBtn.addEventListener("click", () => {
          closeModal();
          array[i].item = elEditInput.value;
          localStorage.setItem("item", JSON.stringify(array));
          renderElement(array);
        });
      }
    });
    renderElement(array);
  }
});

//search filter
elFilterSearch.addEventListener("input", () => {
  const value = elFilterSearch.value.trim();

  const elRegx = new RegExp(value, "gi");
  const filteredArr = array.filter((item) => item.item.match(elRegx));

  if (filteredArr.length > 0) {
    renderElement(filteredArr);
  }
});

// completed list
elListsActive.addEventListener("click", (evt) => {
  if (
    evt.target.matches(".buttons") ||
    evt.target.matches(".fa-check-completed")
  ) {
    evt.target.innerHTML = `<i class="fas fa-check black-tick fa-check-completed"></i>`;
    evt.target.nextElementSibling.style.textDecoration = "line-through";

    elCompletedList.append(evt.target.parentElement.parentElement);
  }
});

// elCompletedList.addEventListener("click", (evt) => {
//   console.log(evt.target.parentElement);
//   if (
//     evt.target.matches(".buttons") ||
//     evt.target.matches(".fa-check-completed")
//   ) {
//     // evt.target.parentElement.innerHTML = ``;
//     console.log(evt.target.classList);

//     elListsActive.appendChild(
//       evt.target.parentElement.parentElement.parentElement
//     );
//     console.log((evt.target.nextElementSibling.style.textDecoration = "none"));
//   }
// });

// event for close modal
elCancel.onclick = () => closeModal();

const closeWarningMenuHandler = () => {
  elInputWarning.classList.remove("show");
};

elAddBtn.addEventListener("click", addItem);
closeWarningMenuBtn.addEventListener("click", closeWarningMenuHandler);
