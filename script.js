let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function saveMedicines() {
  localStorage.setItem("medicines", JSON.stringify(medicines));
}

function renderList() {
  const list = document.getElementById("medicineList");
  list.innerHTML = "";
  medicines.forEach((med, index) => {
    const li = document.createElement("li");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = med.name;
    nameInput.disabled = true;

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = med.time;
    timeInput.disabled = true;

    const btns = document.createElement("div");
    btns.className = "action-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const editing = !nameInput.disabled;
      if (editing) {
        medicines[index].name = nameInput.value;
        medicines[index].time = timeInput.value;
        nameInput.disabled = true;
        timeInput.disabled = true;
        editBtn.textContent = "Edit";
        saveMedicines();
        renderList();
      } else {
        nameInput.disabled = false;
        timeInput.disabled = false;
        nameInput.focus();
        editBtn.textContent = "Save";
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

    li.appendChild(nameInput);
    li.appendChild(timeInput);
    li.appendChild(btns);
    list.appendChild(li);
  });
}

function addMedicine() {
  const name = document.getElementById("medicineInput").value.trim();
  const time = document.getElementById("timeInput").value;

  if (name !== "" && time !== "") {
    medicines.push({ name, time });
    document.getElementById("medicineInput").value = "";
    document.getElementById("timeInput").value = "";
    saveMedicines();
    renderList();
  }
}

renderList();
