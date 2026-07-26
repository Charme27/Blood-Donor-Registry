import sqlite3
import csv

# Connect to database
conn = sqlite3.connect("blood_donor.db")
cursor = conn.cursor()

# Open CSV file
with open("../database/donors.csv", "r") as file:
    reader = csv.reader(file)

    # Skip header row
    next(reader)

    # Insert each row into the database
    for row in reader:
        cursor.execute("""
        INSERT INTO donors (
            donor_id,
            name,
            blood_group,
            area,
            contact,
            last_donation_date,
            eligible,
            total_donations
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, row)

# Save changes
conn.commit()
conn.close()

print("✅ All donor records imported successfully!")