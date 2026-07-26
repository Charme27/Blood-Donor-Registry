import sqlite3

# Connect to SQLite database
conn = sqlite3.connect("blood_donor.db")

cursor = conn.cursor()

# Create donors table
cursor.execute("""
CREATE TABLE IF NOT EXISTS donors (
    donor_id TEXT PRIMARY KEY,
    name TEXT,
    blood_group TEXT,
    area TEXT,
    contact TEXT,
    last_donation_date TEXT,
    eligible TEXT,
    total_donations INTEGER
)
""")

conn.commit()
conn.close()

print("✅ Database Created Successfully!")