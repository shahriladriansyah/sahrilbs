/** * assets/script/script.js
 * * Skrip untuk mengelola Address Book (Kontak) menggunakan localStorage.
 */

// --- Variabel DOM ---
const contactForm = document.getElementById("contact-form");
const contactIdInput = document.getElementById("contact-id");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const contactsTableBody = document.querySelector("#contacts-table tbody");
const countSpan = document.getElementById("count");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");

// --- Fungsi Utilitas localStorage ---
const STORAGE_KEY = "addressBooksContacts";

/**
 * Mengambil semua kontak dari localStorage.
 * @returns {Array} Daftar kontak.
 */
function getContacts() {
  const contactsJson = localStorage.getItem(STORAGE_KEY);
  return contactsJson ? JSON.parse(contactsJson) : [];
}

/**
 * Menyimpan daftar kontak ke localStorage.
 * @param {Array} contacts - Daftar kontak yang akan disimpan.
 */
function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

// --- Fungsionalitas Utama ---

/**
 * Menampilkan kontak ke tabel.
 */
function renderContacts() {
  const contacts = getContacts();
  contactsTableBody.innerHTML = ""; // Kosongkan tabel

  contacts.forEach((contact) => {
    const row = contactsTableBody.insertRow();
    row.className =
      "border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition";

    // Kolom Nama
    let cell = row.insertCell();
    cell.textContent = contact.name;
    cell.className = "p-3 font-medium text-gray-900 dark:text-white";

    // Kolom Telepon
    cell = row.insertCell();
    cell.textContent = contact.phone;
    cell.className = "p-3 text-gray-700 dark:text-gray-300";

    // Kolom Alamat
    cell = row.insertCell();
    cell.textContent = contact.address || "-"; // Tampilkan '-' jika kosong
    cell.className = "p-3 text-gray-700 dark:text-gray-300";

    // Kolom Aksi (Edit & Hapus)
    cell = row.insertCell();
    cell.className = "p-3 space-x-2 whitespace-nowrap";

    // Tombol Edit
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className =
      "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition";
    editButton.onclick = () => editContact(contact.id);
    cell.appendChild(editButton);

    // Tombol Hapus
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className =
      "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition ml-2";
    deleteButton.onclick = () => deleteContact(contact.id);
    cell.appendChild(deleteButton);
  });

  // Update jumlah kontak
  countSpan.textContent = `${contacts.length} kontak`;
}

/**
 * Menangani submit form (tambah atau edit kontak).
 * @param {Event} e
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const id = contactIdInput.value;
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !phone) {
    alert("Nama dan Telepon wajib diisi.");
    return;
  }

  let contacts = getContacts();

  if (id) {
    // Mode Edit
    const index = contacts.findIndex((c) => c.id == id);
    if (index !== -1) {
      contacts[index] = { id: Number(id), name, phone, address };
      alert("Kontak berhasil diupdate!");
    }
  } else {
    // Mode Tambah
    const newContact = {
      id: Date.now(), // ID unik berdasarkan timestamp
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

/**
 * Mengisi form dengan data kontak untuk di-edit.
 * @param {number} id - ID kontak yang akan di-edit.
 */
function editContact(id) {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.id === id);

  if (contact) {
    contactIdInput.value = contact.id;
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    addressInput.value = contact.address;

    saveBtn.textContent = "Simpan Perubahan";
    saveBtn.classList.remove("bg-blue-600", "hover:bg-blue-700");
    saveBtn.classList.add("bg-green-600", "hover:bg-green-700");
  }
}

/**
 * Menghapus kontak berdasarkan ID.
 * @param {number} id - ID kontak yang akan dihapus.
 */
function deleteContact(id) {
  if (confirm("Yakin ingin menghapus kontak ini?")) {
    let contacts = getContacts();
    contacts = contacts.filter((c) => c.id !== id);
    saveContacts(contacts);
    renderContacts();
  }
}

/**
 * Mereset form input ke kondisi awal (mode Tambah).
 */
function resetForm() {
  contactForm.reset();
  contactIdInput.value = "";

  saveBtn.textContent = "Tambah Kontak";
  saveBtn.classList.remove("bg-green-600", "hover:bg-green-700");
  saveBtn.classList.add("bg-blue-600", "hover:bg-blue-700");
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", renderContacts);
contactForm.addEventListener("submit", handleFormSubmit);
resetBtn.addEventListener("click", resetForm);
