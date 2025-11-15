// Ambil elemen DOM
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Ambil data dari localStorage saat halaman dimuat
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Fungsi untuk menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Fungsi untuk merender daftar kontak
function renderContacts() {
  contactList.innerHTML = ""; // Kosongkan tabel sebelum render

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");

    // Format email jika tidak ada
    const emailDisplay =
      contact.email || '<span class="text-muted dark:text-gray-400">-</span>';
    // Format alamat jika tidak ada
    const addressDisplay =
      contact.address || '<span class="text-muted dark:text-gray-400">-</span>';

    row.innerHTML = `
      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-dark-text">${
        index + 1
      }</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-dark-text">${
        contact.name
      }</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-dark-text">${
        contact.phone
      }</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-dark-text">${emailDisplay}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-dark-text">${addressDisplay}</td>
      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3 edit-btn" data-index="${index}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 delete-btn" data-index="${index}">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;

    contactList.appendChild(row);
  });

  // Tambahkan event listener ke tombol edit dan hapus
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(
        e.target.closest(".edit-btn").getAttribute("data-index")
      );
      editContact(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(
        e.target.closest(".delete-btn").getAttribute("data-index")
      );
      deleteContact(index);
    });
  });
}

// Fungsi untuk menambah kontak baru
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone) {
    alert("Name and Phone are required fields.");
    return;
  }

  const newContact = { name, phone, email, address };

  contacts.push(newContact);
  saveToLocalStorage();
  renderContacts();
  contactForm.reset(); // Reset form setelah submit
});

// Fungsi untuk mengedit kontak
function editContact(index) {
  const contact = contacts[index];

  // Isi form dengan data kontak yang dipilih
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email || "";
  document.getElementById("address").value = contact.address || "";

  // Hapus kontak lama dari array
  contacts.splice(index, 1);

  // Scroll ke atas agar form terlihat
  document.querySelector("html").scrollTop = 0;

  // Render ulang daftar
  saveToLocalStorage();
  renderContacts();
}

// Fungsi untuk menghapus kontak
function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    saveToLocalStorage();
    renderContacts();
  }
}

// Inisialisasi tampilan saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
