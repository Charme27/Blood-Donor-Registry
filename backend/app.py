from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# -------------------- Home Page --------------------

@app.route("/")
def home():
    return "Blood Donor Registry Backend is Running!"

# -------------------- Show All Donors --------------------

@app.route("/donors")
def donors():

    conn = sqlite3.connect("blood_donor.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT donor_id,
               name,
               blood_group,
               area,
               contact,
               last_donation_date,
               eligible,
               total_donations
        FROM donors
    """)

    rows = cursor.fetchall()

    conn.close()

    donors = []

    for row in rows:
        donors.append({
            "donor_id": row[0],
            "name": row[1],
            "blood_group": row[2],
            "area": row[3],
            "contact": row[4],
            "last_donation_date": row[5],
            "eligible": row[6],
            "total_donations": row[7]
        })

    return jsonify(donors)

# -------------------- Add New Donor --------------------

@app.route("/add-donor", methods=["POST"])
def add_donor():

    data = request.json
    if not data["donor_id"] or not data["name"] or not data["blood_group"] or not data["area"]:
        return jsonify({"message": "All fields are required!"}),400

    conn = sqlite3.connect("blood_donor.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO donors
        (donor_id, name, blood_group, area,
         contact, last_donation_date,
         eligible, total_donations)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["donor_id"],
        data["name"],
        data["blood_group"],
        data["area"],
        "",
        "",
        "Yes",
        0
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Donor Added Successfully"})

# -------------------- Delete Donor --------------------

@app.route("/delete-donor/<donor_id>", methods=["DELETE"])
def delete_donor(donor_id):

    conn = sqlite3.connect("blood_donor.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM donors WHERE donor_id = ?",
        (donor_id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Donor Deleted Successfully"})

# ----------------------Update Donor------------------------

@app.route("/update-donor", methods=["PUT"])
def update_donor():

    data = request.json

    conn = sqlite3.connect("blood_donor.db")
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE donors
        SET name=?,
            blood_group=?,
            area=?
        WHERE donor_id=?
    """, (
        data["name"],
        data["blood_group"],
        data["area"],
        data["donor_id"]
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Donor Updated Successfully"})

# -------------------- Run Flask --------------------

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)