
    const initialContacts = [
        { name: "Ayman Zeed", email: "Ayman.zeed@gmail.com", phone: "+972 50-3045074" },
        { name: "Arwad Rahal", email: "arwad.rahal@gmail.com", phone: "+972 50-3982223" },
        { name: "Yasmen Hilou", email: "Yasmen.hilou@gmail.com", phone: "+972 54-3563636" },
        { name: "Jana Shaaban", email: "Jana.Shaaban@gmail.com", phone: "+972 50-5179503" },
        { name: "Danya Sawaeed", email: "Danya.Sawaeed@gmail.com", phone: "+972 50-5179503" },
        { name: "Ola Khateeb", email: "Ola_Khateeb@gmail.com", phone: "+972 50-2541373" },
        { name: "Seeba Anabose", email: "Seeba.anabose@gmail.com", phone: "+972 52-2966499" },
        { name: "Adam Baria", email: "Adam_baria@gmail.com", phone: "+972 54-3980730" },
        { name: "Yaman Zeed", email: "Yaman.zeed@gmail.com", phone: "+972 50-5897935" },
        { name: "Ahmad Zeed", email: "Ahmad.zeed@gmail.com", phone: "+972 50-6337774" }
    ];


    let contacts = [...initialContacts];
    let editingContactIndex = null;


    const renderContacts = (filter = "") => {
        const contactList = document.getElementById("contactList");
        contactList.innerHTML = "";


        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.email.toLowerCase().includes(filter.toLowerCase()) ||
            contact.phone.includes(filter)
        );

        filteredContacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.classList.add("contact-item");
            li.innerHTML = `
                <div class="contact-details">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-email">Email: ${contact.email}</div>
                    <div class="contact-phone">Phone: ${contact.phone}</div>
                    <button onclick="editContact(${index})">Edit</button>
                    <button onclick="deleteContact(${index})">Delete</button>
                </div>`;
            contactList.appendChild(li);
        });
    };


    window.editContact = (index) => {
        editingContactIndex = index;
        const contact = contacts[index];
        document.getElementById("name").value = contact.name;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("popupTitle").textContent = "Edit Contact";
        document.getElementById("popup").style.display = "block";
    };


    window.deleteContact = (index) => {
        const confirmation = confirm("Are you sure you want to delete this contact?");
        if (confirmation) {
            contacts.splice(index, 1);
            renderContacts();
        }
    };

    document.getElementById("openPopupButton").addEventListener("click", () => {
        editingContactIndex = null;
        document.getElementById("contactForm").reset();
        document.getElementById("popupTitle").textContent = "Add Contact";
        document.getElementById("popup").style.display = "block";
    });


    document.getElementById("closePopupButton").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });


    document.getElementById("contactForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (editingContactIndex === null) {
            contacts.push({ name, email, phone });
        } else {
            contacts[editingContactIndex] = { name, email, phone };
        }

        renderContacts();
        document.getElementById("contactForm").reset();
        document.getElementById("popup").style.display = "none";
    });


    document.getElementById("searchInput").addEventListener("input", (event) => {
        renderContacts(event.target.value);
    });


    window.deleteContacts = () => {
        const confirmation = confirm("Are you sure you want to delete all contacts?");
        if (confirmation) {
            contacts = [];
            renderContacts();
        }
    };


    renderContacts(); 
});

