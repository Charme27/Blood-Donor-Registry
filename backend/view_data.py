import sqlite3

conn = sqlite3.connect("blood_donor.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM donors")

rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()