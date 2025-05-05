let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function saveMedicines() {
  localStorage.setItem("medicines", JSON.stringify(medicines));
}

function renderList() {
  const list = document.getElementById("medicineList");
  list.innerHTML = "";
  medicines.forEach((med, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = med;
    input.disabled = true;

    const btns = document.createElement("div");
    btns.className = "action-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      if (input.disabled) {
        input.disabled = false;
        editBtn.textContent = "Save";
        input.focus();
      } else {
        input.disabled = true;
        medicines[index] = input.value;
        saveMedicines();
        renderList();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      medicines.splice(index, 1);
      saveMedicines();
      renderList();
    };

    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

    li.appendChild(input);
    li.appendChild(btns);
    list.appendChild(li);
  });
}

function addMedicine() {
  const input = document.getElementById("medicineInput");
  const value = input.value.trim();
  if (value !== "") {
    medicines.push(value);
    input.value = "";
    saveMedicines();
    renderList();
  }
}

renderList();
