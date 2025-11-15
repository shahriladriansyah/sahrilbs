const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const idInput = document.getElementById("contact-id");
const contactsTable = document.querySelector("#contacts-table tbody");
const countText = document.getElementById("count");
const resetBtn = document.getElementById("reset-btn");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function renderContacts() {
  contactsTable.innerHTML = "";

  contacts.forEach((c, index) => {
    const row = `
      <tr class="border-b">
        <td class="p-3">${c.name}</td>
        <td class="p-3">${c.phone}</td>
        <td class="p-3">${c.address || "-"}</td>
        <td class="p-3 flex gap-2">
          <button 
            class="px-3 py-1 bg-yellow-400 rounded-lg text-white hover:bg-yellow-500"
            onclick="editContact(${index})"
          >
            Edit
          </button>

          <button 
            class="px-3 py-1 bg-red-500 rounded-lg text-white hover:bg-red-600"
            onclick="deleteContact(${index})"
          >
            Hapus
          </button>
        </td>
      </tr>
    `;
    contactsTable.insertAdjacentHTML("beforeend", row);
  });

  countText.textContent = `${contacts.length} kontak`;

  localStorage.setItem("contacts", JSON.stringify(contacts));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const id = idInput.value;

  if (id) {
    contacts[id] = { name, phone, address };
  } else {
    contacts.push({ name, phone, address });
  }

  renderContacts();
  form.reset();
  idInput.value = "";
  document.getElementById("save-btn").textContent = "Tambah Kontak";
});

function editContact(index) {
  const c = contacts[index];

  nameInput.value = c.name;
  phoneInput.value = c.phone;
  addressInput.value = c.address;
  idInput.value = index;

  document.getElementById("save-btn").textContent = "Update Kontak";
}

function deleteContact(index) {
  if (confirm("Yakin mau hapus kontak ini?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

resetBtn.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
  document.getElementById("save-btn").textContent = "Tambah Kontak";
});

renderContacts();
