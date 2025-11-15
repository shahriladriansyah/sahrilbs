// ------------------------------
// GLOBAL CONTACTS
// ------------------------------
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// ------------------------------
// Simpan ke LocalStorage
// ------------------------------
function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// ------------------------------
// Render Tabel Kontak (index.html)
// ------------------------------
function renderContacts() {
  const contactList = document.getElementById("contactList");
  if (!contactList) return; // Jika bukan index.html

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
        <a href="edit.html?id=${index}" 
           class="text-blue-600 dark:text-blue-400">
          <i class="fas fa-edit"></i> Edit
        </a>

        <button 
          class="text-red-600 dark:text-red-400 delete-btn"
          data-index="${index}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;

    contactList.appendChild(row);
  });

  attachDeleteButtons();
}

// ------------------------------
// Aktifkan tombol Delete
// ------------------------------
function attachDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;

      if (confirm("Yakin mau hapus kontak ini?")) {
        contacts.splice(index, 1);
        saveToLocalStorage();
        renderContacts();
      }
    });
  });
}

// ------------------------------
// Tambah Kontak Baru (index.html)
// ------------------------------
function initAddForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return; // Jika bukan index.html

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
}

// ------------------------------
// LOAD DATA EDIT (edit.html)
// ------------------------------
function loadEditPage() {
  const editForm = document.getElementById("editContactForm");
  if (!editForm) return; // Jika bukan edit.html

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id === null || !contacts[id]) {
    alert("Kontak tidak ditemukan!");
    window.location.href = "index.html";
    return;
  }

  const contact = contacts[id];

  document.getElementById("editName").value = contact.name;
  document.getElementById("editPhone").value = contact.phone;
  document.getElementById("editEmail").value = contact.email || "";
  document.getElementById("editAddress").value = contact.address || "";

  // ------------------------------
  // UPDATE KONTAK
  // ------------------------------
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    contacts[id] = {
      name: document.getElementById("editName").value.trim(),
      phone: document.getElementById("editPhone").value.trim(),
      email: document.getElementById("editEmail").value.trim(),
      address: document.getElementById("editAddress").value.trim(),
    };

    saveToLocalStorage();
    window.location.href = "index.html";
  });

  // ------------------------------
  // DELETE DARI EDIT PAGE
  // ------------------------------
  document.getElementById("deleteBtn").addEventListener("click", () => {
    if (confirm("Yakin mau hapus kontak ini?")) {
      contacts.splice(id, 1);
      saveToLocalStorage();
      window.location.href = "index.html";
    }
  });
}

// ------------------------------
// AUTO DETECT HALAMAN
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initAddForm();
  renderContacts();
  loadEditPage();
});
