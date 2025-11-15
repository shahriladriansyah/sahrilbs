// Ambil elemen DOM
const contactForm = document.getElementById("contact-form");
const contactIdInput = document.getElementById("contact-id");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const contactsTableBody = document.querySelector("#contacts-table tbody");
const countSpan = document.getElementById("count");

const STORAGE_KEY = "addressBooksContacts";

// ------------------------------
// Fungsi ambil data dari localStorage
function getContacts() {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

// Fungsi simpan kontak
function saveContacts(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ------------------------------
// Render list kontak
function renderContacts() {
  const contacts = getContacts();
  contactsTableBody.innerHTML = "";

  countSpan.textContent = `${contacts.length} kontak`;

  if (contacts.length === 0) {
    contactsTableBody.innerHTML = `
      <tr>
        <td colspan="4" class="p-3 text-center text-gray-500 dark:text-gray-400">
          Belum ada kontak yang tersimpan.
        </td>
      </tr>`;
    return;
  }

  contacts.forEach((contact) => {
    const row = document.createElement("tr");
    row.className =
      "border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition";

    row.innerHTML = `
      <td class="p-3 font-medium">${contact.name}</td>
      <td class="p-3">${contact.phone}</td>
      <td class="p-3">${contact.address || "-"}</td>
      <td class="p-3 flex gap-3">
        <button 
          class="edit-btn text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
          data-id="${contact.id}">
          Edit
        </button>

        <button 
          class="delete-btn text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
          data-id="${contact.id}">
          Hapus
        </button>
      </td>
    `;

    contactsTableBody.appendChild(row);
  });

  // Add listeners
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

// ------------------------------
// Submit handler
function handleSubmit(e) {
  e.preventDefault();

  const id = contactIdInput.value;
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !phone) {
    alert("Nama dan telepon wajib diisi!");
    return;
  }

  let contacts = getContacts();

  if (id) {
    contacts = contacts.map((c) =>
      c.id === id ? { ...c, name, phone, address } : c
    );
    alert("Kontak berhasil diperbarui!");
  } else {
    const newContact = {
      id: Date.now().toString(),
      name,
      phone,
      address,
    };
    contacts.push(newContact);
    alert("Kontak berhasil ditambahkan!");
  }

  saveContacts(contacts);
  resetForm();
  renderContacts();
}

// Edit handler
function handleEdit(e) {
  const id = e.target.dataset.id;
  const contact = getContacts().find((c) => c.id === id);

  if (!contact) return;

  contactIdInput.value = contact.id;
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  addressInput.value = contact.address;

  saveBtn.textContent = "Simpan Perubahan";
  saveBtn.classList.remove("bg-blue-600");
  saveBtn.classList.add("bg-green-600");

  contactForm.scrollIntoView({ behavior: "smooth" });
}

// Delete handler
function handleDelete(e) {
  const id = e.target.dataset.id;

  if (confirm("Yakin ingin menghapus kontak ini?")) {
    let contacts = getContacts();
    contacts = contacts.filter((c) => c.id !== id);
    saveContacts(contacts);
    renderContacts();
    alert("Kontak berhasil dihapus!");
  }
}

// Reset form
function resetForm() {
  contactForm.reset();
  contactIdInput.value = "";
  saveBtn.textContent = "Tambah Kontak";
  saveBtn.classList.remove("bg-green-600");
  saveBtn.classList.add("bg-blue-600");
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", renderContacts);

contactForm.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", resetForm);
