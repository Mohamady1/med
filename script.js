let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function renderMedicines() {
  const list = document.getElementById("medicineList");
  list.innerHTML = "";

  medicines.forEach((med, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = med;
    input.disabled = true;

    const actions = document.createElement("div");
    actions.className = "action-btns";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => {
      if (input.disabled) {
        input.disabled = false;
        input.focus();
        editBtn.innerText = "Save";
      } else {
        medicines[index] = input.value.trim();
        saveToStorage();
        renderMedicines();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      medicines.splice(index, 1);
      saveToStorage();
      renderMedicines();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(input);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function addMedicine() {
  const input = document.getElementById("medicineInput");
  const name = input.value.trim();
  if (name) {
    medicines.push(name);
    saveToStorage();
    input.value = "";
    renderMedicines();
  }
}

function saveToStorage() {
  localStorage.setItem("medicines", JSON.stringify(medicines));
}

renderMedicines();
