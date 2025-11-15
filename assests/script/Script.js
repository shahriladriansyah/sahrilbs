// ------------------------------
// Ambil elemen DOM
// ------------------------------
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Ambil data dari localStorage saat halaman dimuat
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// ------------------------------
// Simpan ke LocalStorage
// ------------------------------
function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// ------------------------------
// Render Tabel Kontak
// ------------------------------
function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");

    const emailDisplay =
      contact.email || '<span class="text-gray-400">-</span>';
    const addressDisplay =
      contact.address || '<span class="text-gray-400">-</span>';

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium">${index + 1}</td>
      <td class="px-4 py-3 text-sm">${contact.name}</td>
      <td class="px-4 py-3 text-sm">${contact.phone}</td>
      <td class="px-4 py-3 text-sm">${emailDisplay}</td>
      <td class="px-4 py-3 text-sm">${addressDisplay}</td>

      <td class="px-4 py-3 text-sm font-medium flex gap-3">
        <button 
          class="text-blue-600 dark:text-blue-400 edit-btn"
          data-index="${index}">
          <i class="fas fa-edit"></i> Edit
        </button>

        <button 
          class="text-red-600 dark:text-red-400 delete-btn"
          data-index="${index}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;

    contactList.appendChild(row);
  });

  // Re-bind event tombol setiap kali render
  attachActionButtons();
}

// ------------------------------
// Fungsi buat mengaktifkan tombol edit & delete
// ------------------------------
function attachActionButtons() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      editContact(parseInt(index));
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      deleteContact(parseInt(index));
    });
  });
}

// ------------------------------
// Tambah Kontak Baru
// ------------------------------
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone) {
    alert("Name dan Phone wajib diisi 😎");
    return;
  }

  contacts.push({ name, phone, email, address });

  saveToLocalStorage();
  renderContacts();
  contactForm.reset();
});

// ------------------------------
// Edit Kontak
// ------------------------------
function editContact(index) {
  const contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email || "";
  document.getElementById("address").value = contact.address || "";

  // Hapus data lama, nanti ditambahkan ulang waktu submit form
  contacts.splice(index, 1);

  saveToLocalStorage();
  renderContacts();

  // Scroll ke form biar user langsung lihat inputnya
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ------------------------------
// Hapus Kontak
// ------------------------------
function deleteContact(index) {
  if (confirm("Yakin mau hapus? Nanti nyesel lho 😭")) {
    contacts.splice(index, 1);
    saveToLocalStorage();
    renderContacts();
  }
}

// ------------------------------
// Render awal saat halaman di-load
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
