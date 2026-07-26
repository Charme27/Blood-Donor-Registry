// Check whether the user is logged in
if (window.location.pathname.includes("index.html")) {

    let role = localStorage.getItem("role");

    if (role === null) {
        window.location.href = "login.html";
    }

}

let editMode = false;

window.onload = function () {

    let role = localStorage.getItem("role");

    if (role === "staff") {

        document.querySelector(".add-btn").style.display = "none";

    }


};

// -------------------- Load Donors --------------------

async function loadDonors() {

    const table = document.getElementById("donorTable");

    table.innerHTML = `
    <tr>
        <td colspan="6">Loading donors...</td>
    </tr>
    `;

    try {

        const response = await fetch("http://127.0.0.1:8000/donors");

        const donors = await response.json();
        document.getElementById("totalDonors").innerText = donors.length;

        let eligible = donors.filter(d => d.eligible === "Yes").length;

        let notEligible = donors.filter(d => d.eligible === "No").length;

        document.getElementById("eligibleDonors").innerText = eligible;

        document.getElementById("notEligibleDonors").innerText = notEligible;

        if (donors.length === 0) {

            table.innerHTML = `
            <tr>
                <td colspan="6">No donors found.</td>
            </tr>
            `;

            return;

        }

        table.innerHTML = "";

        donors.forEach(donor => {

            let role = localStorage.getItem("role");

            let actions = "";

            if (role === "admin") {

                actions = `
                    <button onclick="editDonor(
                        '${donor.donor_id}',
                        '${donor.name}',
                        '${donor.blood_group}',
                        '${donor.area}'
                    )">
                        Edit
                    </button>

                    <button onclick="deleteDonor('${donor.donor_id}')">
                        Delete
                    </button>
                `;

            } else {

                actions = "View Only";

            }

            table.innerHTML += `
            <tr>
                <td>${donor.donor_id}</td>
                <td>${donor.name}</td>
                <td>${donor.blood_group}</td>
                <td>${donor.area}</td>
                <td>${donor.eligible}</td>
                <td>${actions}</td>
            </tr>
            `;

        });

    }

    catch (error) {

        table.innerHTML = `
        <tr>
            <td colspan="6">Unable to load donors.</td>
        </tr>
        `;

        console.log(error);

    }

}

loadDonors();

// -------------------- Search --------------------

function searchDonors() {

    let searchText = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#donorTable tr");

    rows.forEach(row => {

        let name = row.cells[1].innerText.toLowerCase();

        if (name.includes(searchText)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

// -------------------- Blood Group Filter --------------------

function filterBloodGroup() {

    let selectedGroup = document.getElementById("bloodGroup").value;

    let rows = document.querySelectorAll("#donorTable tr");

    rows.forEach(row => {

        let group = row.cells[2].innerText;

        if (selectedGroup === "" || group === selectedGroup) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}

// -------------------- Login --------------------

function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    alert("Username = " + username + "\nPassword = " + password);

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("role", "admin");
        window.location.href = "index.html";

    }

    else if (username === "staff" && password === "staff123") {

        localStorage.setItem("role", "staff");
        window.location.href = "index.html";

    }

    else {

        document.getElementById("message").innerHTML =
            "Invalid Username or Password";

    }

}
// -------------------- Logout --------------------

function logout() {

    localStorage.removeItem("role");

    window.location.href = "login.html";

}

// -------------------- Show Form --------------------

function showForm() {

    editMode = false;

    document.getElementById("saveBtn").innerText = "Save Donor";

    document.getElementById("donorForm").style.display = "flex";

    document.getElementById("donorId").value = "";
    document.getElementById("donorName").value = "";
    document.getElementById("bloodGroupInput").value = "";
    document.getElementById("areaInput").value = "";

}

// -------------------- Save / Update Donor --------------------

async function saveDonor() {

    let donor = {

        donor_id: document.getElementById("donorId").value,
        name: document.getElementById("donorName").value,
        blood_group: document.getElementById("bloodGroupInput").value,
        area: document.getElementById("areaInput").value

    };

    // UPDATE

    if (editMode) {

        const response = await fetch("http://127.0.0.1:8000/update-donor", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(donor)

        });

        const result = await response.json();

        alert(result.message);

        editMode = false;

        document.getElementById("saveBtn").innerText = "Save Donor";

    }

    // ADD

    else {

        const response = await fetch("http://127.0.0.1:8000/add-donor", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(donor)

        });

        const result = await response.json();

        alert(result.message);

    }

    document.getElementById("donorId").value = "";
    document.getElementById("donorName").value = "";
    document.getElementById("bloodGroupInput").value = "";
    document.getElementById("areaInput").value = "";

    document.getElementById("donorForm").style.display = "none";

    loadDonors();

}

// -------------------- Delete Donor --------------------

async function deleteDonor(donorId) {

    let confirmDelete = confirm("Are you sure you want to delete this donor?");

    if (!confirmDelete) {

        return;

    }

    const response = await fetch(

        `http://127.0.0.1:8000/delete-donor/${donorId}`,

        {

            method: "DELETE"

        }

    );

    const result = await response.json();

    alert(result.message);

    loadDonors();

}

// -------------------- Edit Donor --------------------

function editDonor(id, name, group, area) {

    editMode = true;

    document.getElementById("saveBtn").innerText = "Update Donor";

    document.getElementById("donorForm").style.display = "flex";

    document.getElementById("donorId").value = id;
    document.getElementById("donorName").value = name;
    document.getElementById("bloodGroupInput").value = group;
    document.getElementById("areaInput").value = area;

}