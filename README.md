## Project Demo 🎥

[Watch Demo Video](https://drive.google.com/file/d/1nijVJiiKXolecvx5ARStGNGLinp-MIrX/view?usp=share_link)


# 🩸 Blood Donor Registry

A web-based Blood Donor Registry System developed using **HTML, CSS, JavaScript, Flask, and SQLite**. This application helps manage blood donor information by allowing users to view donor records, while administrators can securely add, update, and delete donor details.

---

## 📌 Project Overview

The Blood Donor Registry is designed to simplify donor management for blood banks and hospitals. It provides an easy-to-use interface to search and filter donor information while maintaining secure access for administrators.

---

## ✨ Features

- 🔐 Login Authentication (Admin & Staff)
- 👀 Staff can view donor records
- ➕ Add new donor
- ✏️ Edit donor details
- ❌ Delete donor records
- 🔍 Search donors by name
- 🩸 Filter donors by blood group
- 💾 SQLite database integration
- 🔄 Real-time data update using Flask API

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### Database
- SQLite

---

## 📁 Project Structure

```
Blood-Donor-Registry/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── import_data.py
│   ├── view_data.py
│   ├── delete_header.py
│   └── blood_donor.db
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── script.js
│   └── style.css
│
├── database/
│   └── donors.csv
│
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Charme27/Blood-Donor-Registry.git
```

### 2. Open the project folder

```bash
cd Blood-Donor-Registry
```

### 3. Install Flask

```bash
pip install flask flask-cors
```

### 4. Start the backend server

```bash
cd backend
python app.py
```

The backend runs on:

```
http://127.0.0.1:8000
```

### 5. Open the frontend

Open `frontend/login.html` in your browser.

---

## 👤 Login Credentials

### Admin

Username:

```
admin
```

Password:

```
admin123
```

### Staff

Username:

```
staff
```

Password:

```
staff123
```

---


## 📈 Future Enhancements

- User registration
- Email notifications
- Blood request management
- Hospital integration
- Dashboard analytics
- Cloud database support

---

## 👨‍💻 Developed By

**Charme M**

Department of Computer Science and Engineering

Prince Shri Venkateshwara Padmavathy Engineering College

---

## 📄 License

This project is developed for educational purposes.
