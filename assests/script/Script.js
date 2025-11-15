// Ambil elemen DOM
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Ambil data dari localStorage saat halaman dimuat
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Simpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Render tabel kontak
function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");

    const emailDisplay =
      contact.email || '<span class="text-muted dark:text-gray-400">-</span>';
    const addressDisplay =
      contact.address || '<span class="text-muted dark:text-gray-400">-</span>';

    row.innerHTML = `
      <td class="px-4 py-3 text-sm font-medium">${index + 1}</td>
      <td class="px-4 py-3 text-sm">${contact.name}</td>
      <td class="px-4 py-3 text-sm">${contact.phone}</td>
      <td class="px-4 py-3 text-sm">${emailDisplay}</td>
      <td class="px-4 py-3 text-sm">${addressDisplay}</td>

      <td class="px-4 py-3 text-sm font-medium">
        <button 
          class="text-blue-600 dark:text-blue-400 mr-3 edit-btn"
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

  // Bikin tombol edit & delete hidup lagi setiap render
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      editContact(parseInt(index));
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      deleteContact(parseInt(index));
    });
  });
}

// Tambah kontak baru
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone) {
    alert("Name and Phone are required.");
    return;
  }

  contacts.push({ name, phone, email, address });

  saveToLocalStorage();
  renderContacts();
  contactForm.reset();
});

// Edit kontak
function editContact(index) {
  const contact = contacts[index];

  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email || "";
  document.getElementById("address").value = contact.address || "";

  // Hapus dulu kontak yg lama
  contacts.splice(index, 1);

  saveToLocalStorage();
  renderContacts();

  // Scroll ke form biar user langsung liat input-nya
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Hapus kontak
function deleteContact(index) {
  if (confirm("Yakin mau hapus kontak ini?")) {
    contacts.splice(index, 1);
    saveToLocalStorage();
    renderContacts();
  }
}

// Render awal
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
