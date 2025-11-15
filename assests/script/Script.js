// Ambil elemen-elemen DOM yang dibutuhkan
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

// --- FUNGSI UTAMA ---

// 1. Ambil data kontak dari LocalStorage
function getContacts() {
  const contactsJSON = localStorage.getItem(STORAGE_KEY); // Kembalikan array kosong jika tidak ada data
  return contactsJSON ? JSON.parse(contactsJSON) : [];
}

// 2. Simpan data kontak ke LocalStorage
function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

// 3. Render (tampilkan) daftar kontak
function renderContacts() {
  const contacts = getContacts(); // Kosongkan isi tabel sebelum diisi ulang

  contactsTableBody.innerHTML = ""; // Update jumlah kontak

  countSpan.textContent = `${contacts.length} kontak`; // Jika tidak ada kontak, tampilkan pesan

  if (contacts.length === 0) {
    const noDataRow = `
            <tr>
                <td colspan="4" class="p-3 text-center text-gray-500 dark:text-gray-400">
                    Belum ada kontak yang tersimpan.
                </td>
            </tr>
        `;
    contactsTableBody.innerHTML = noDataRow;
    return;
  } // Iterasi melalui setiap kontak dan buat baris tabel

  contacts.forEach((contact) => {
    const row = document.createElement("tr");
    row.classList.add(
      "border-b",
      "dark:border-gray-700",
      "hover:bg-gray-50",
      "dark:hover:bg-gray-700/50",
      "transition"
    );
    row.innerHTML = `
            <td class="p-3 font-medium">${contact.name}</td>
            <td class="p-3">${contact.phone}</td>
            <td class="p-3">${contact.address || "-"}</td>
            <td class="p-3 flex space-x-2">
                <button 
                    class="edit-btn text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition text-sm" 
                    data-id="${contact.id}"
                    type="button"
                >
                    Edit
                </button>
                <button 
                    class="delete-btn text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition text-sm" 
                    data-id="${contact.id}"
                    type="button"
                >
                    Hapus
                </button>
            </td>
        `;
    contactsTableBody.appendChild(row);
  }); // Tambahkan event listener untuk tombol edit dan hapus setelah rendering

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", handleEdit);
  });
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", handleDelete);
  });
}

// 4. Reset formulir dan ubah tampilan tombol
function resetForm() {
  contactForm.reset();
  contactIdInput.value = ""; // Hapus ID yang tersimpan
  saveBtn.textContent = "Tambah Kontak";
  saveBtn.classList.remove("bg-green-600", "hover:bg-green-700");
  saveBtn.classList.add("bg-blue-600", "hover:bg-blue-700");
}

// --- HANDLER EVENT ---

// 1. Handle form submit (Tambah atau Edit)
function handleSubmit(event) {
  event.preventDefault();

  const id = contactIdInput.value;
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !phone) {
    alert("Nama dan Telepon wajib diisi!");
    return;
  }

  const newContact = { name, phone, address };
  let contacts = getContacts();

  if (id) {
    // Mode Edit: Cari kontak dan perbarui datanya
    contacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...newContact } : contact
    );
    alert("Kontak berhasil diperbarui!");
  } else {
    // Mode Tambah: Beri ID unik dan tambahkan ke array
    newContact.id = Date.now().toString(); // ID unik sederhana
    contacts.push(newContact);
    alert("Kontak berhasil ditambahkan!");
  }

  saveContacts(contacts);
  resetForm();
  renderContacts(); // <<== Bagian ini memastikan tabel diperbarui
}

// 2. Handle Edit
function handleEdit(event) {
  const idToEdit = event.target.dataset.id;
  const contacts = getContacts();
  const contactToEdit = contacts.find((c) => c.id === idToEdit);

  if (contactToEdit) {
    // Isi form dengan data kontak
    contactIdInput.value = contactToEdit.id;
    nameInput.value = contactToEdit.name;
    phoneInput.value = contactToEdit.phone;
    addressInput.value = contactToEdit.address; // Ubah teks dan warna tombol

    saveBtn.textContent = "Simpan Perubahan";
    saveBtn.classList.remove("bg-blue-600", "hover:bg-blue-700");
    saveBtn.classList.add("bg-green-600", "hover:bg-green-700"); // Gulir ke formulir

    contactForm.scrollIntoView({ behavior: "smooth" });
  }
}

// 3. Handle Delete
function handleDelete(event) {
  const idToDelete = event.target.dataset.id;

  if (confirm("Yakin ingin menghapus kontak ini?")) {
    let contacts = getContacts(); // Filter array untuk menghapus kontak dengan ID yang sesuai
    contacts = contacts.filter((contact) => contact.id !== idToDelete);

    saveContacts(contacts);
    renderContacts(); // <<== Bagian ini memastikan tabel diperbarui setelah dihapus
    alert("Kontak berhasil dihapus!");
  }
}

// 4. Handle Reset Button
function handleResetClick() {
  resetForm();
}

// --- INISIALISASI (Run saat halaman dimuat) ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Tampilkan kontak yang sudah ada saat halaman dimuat
  renderContacts(); // <<== Bagian ini memastikan kontak muncul saat pertama kali load
});

// --- PASANG EVENT LISTENERS ---
contactForm.addEventListener("submit", handleSubmit);
resetBtn.addEventListener("click", handleResetClick);
