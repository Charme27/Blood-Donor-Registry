import sqlite3

conn = sqlite3.connect("blood_donor.db")
cursor = conn.cursor()

cursor.execute("DELETE FROM donors WHERE donor_id='donor_id'")

conn.commit()
conn.close()

print("✅ Header row deleted successfully!")