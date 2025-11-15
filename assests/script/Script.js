// Ambil elemen utama
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const idInput = document.getElementById("contact-id");
const contactsTable = document.querySelector("#contacts-table tbody");
const countText = document.getElementById("count");
const resetBtn = document.getElementById("reset-btn");
const saveBtn = document.getElementById("save-btn");

// Ambil data dari localStorage (kalau ada)
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Render data kontak ke tabel
function renderContacts() {
  contactsTable.innerHTML = "";

  contacts.forEach((c, index) => {
    const row = `
      <tr class="border-b dark:border-gray-700">
        <td class="p-3 align-top">${c.name}</td>
        <td class="p-3 align-top">${c.phone}</td>
        <td class="p-3 align-top">${c.address || "-"}</td>
        <td class="p-3 align-top">
          <div class="flex flex-wrap gap-2">
            <button 
              class="px-3 py-1 text-xs rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition"
              onclick="editContact(${index})"
              type="button"
            >
              Edit
            </button>

            <button 
              class="px-3 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              onclick="deleteContact(${index})"
              type="button"
            >
              Hapus
            </button>
          </div>
        </td>
      </tr>
    `;
    contactsTable.insertAdjacentHTML("beforeend", row);
  });

  // Update jumlah kontak
  countText.textContent = `${contacts.length} kontak`;

  // Simpan ke localStorage
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Handle submit form (tambah / update kontak)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const id = idInput.value;

  if (!name || !phone) {
    alert("Nama dan telepon wajib diisi.");
    return;
  }

  if (id) {
    // mode edit
    contacts[id] = { name, phone, address };
  } else {
    // mode tambah
    contacts.push({ name, phone, address });
  }

  renderContacts();
  form.reset();
  idInput.value = "";
  saveBtn.textContent = "Tambah Kontak";
});

// Fungsi edit (dipanggil dari tombol Edit)
function editContact(index) {
  const c = contacts[index];

  nameInput.value = c.name;
  phoneInput.value = c.phone;
  addressInput.value = c.address;
  idInput.value = index;

  saveBtn.textContent = "Update Kontak";

  // Scroll ke form biar enak kalau list sudah panjang
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Fungsi hapus (dipanggil dari tombol Hapus)
function deleteContact(index) {
  if (confirm("Yakin mau hapus kontak ini?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}

// Handle tombol reset
resetBtn.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
  saveBtn.textContent = "Tambah Kontak";
});

// Render awal saat page dibuka
renderContacts();
