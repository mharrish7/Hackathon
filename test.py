import sqlite3


con = sqlite3.connect('users.db')
cursor = con.cursor()
cursor.execute('drop table Layout')

con.commit()
con.close()
