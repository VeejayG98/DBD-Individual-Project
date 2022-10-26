from crypt import methods
import mysql.connector
from flask import Flask, jsonify, request
import pandas as pd

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Scamp*2909",
  database="Library"
)

mycursor = mydb.cursor(dictionary= True)

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/books/all', methods = ['GET'])
def getBooks():
    mycursor.execute("SELECT AUTHORS.NAME, BOOKS.TITLE, BOOKS.ISBN13 FROM \
    AUTHORS INNER JOIN BOOK_AUTHORS ON AUTHORS.AUTHOR_ID = BOOK_AUTHORS.AUTHOR_ID \
    INNER JOIN BOOKS ON BOOK_AUTHORS.ISBN13 = BOOKS.ISBN13")
    
    myresult = mycursor.fetchall()
    return jsonify(myresult)

@app.route('/books/search', methods = ['GET'])
def searchBooks():
    if 'search' in request.args:
        search = request.args['search']
    else:
        return "Error: No search field provided. Please specify an search."
    
    mycursor.execute(f"SELECT AUTHORS.NAME, BOOKS.TITLE, BOOKS.ISBN13, BOOKS.AVAILABLE FROM \
        AUTHORS INNER JOIN BOOK_AUTHORS ON AUTHORS.AUTHOR_ID = BOOK_AUTHORS.AUTHOR_ID \
        INNER JOIN BOOKS ON BOOK_AUTHORS.ISBN13 = BOOKS.ISBN13 \
        WHERE AUTHORS.NAME LIKE '%{search}%' OR BOOKS.TITLE LIKE '%{search}%' OR BOOKS.ISBN13 LIKE '%{search}%'")
    
    myresult = mycursor.fetchall()
    myresult = pd.DataFrame(myresult)
    agg_functions = {'NAME': lambda x: ", ".join(x),
                 'TITLE' : 'first',
                 'AVAILABLE' : 'first'}

    myresult = myresult.groupby('ISBN13', as_index= False).agg(agg_functions)
    return jsonify(myresult.to_dict('records'))
    

app.run()