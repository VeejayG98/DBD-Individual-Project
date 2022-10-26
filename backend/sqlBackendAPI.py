from crypt import methods
from datetime import datetime, timedelta
from matplotlib.style import available
import mysql.connector
from flask import Flask, jsonify, request
import pandas as pd

def connectSQLDB():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Scamp*2909",
        database="Library"
    )
    return mydb

# mycursor = mydb.cursor(dictionary=True)

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/books/all', methods=['GET'])
def getBooks():

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)
    
    mycursor.execute("SELECT AUTHORS.NAME, BOOKS.TITLE, BOOKS.ISBN13 FROM \
    AUTHORS INNER JOIN BOOK_AUTHORS ON AUTHORS.AUTHOR_ID = BOOK_AUTHORS.AUTHOR_ID \
    INNER JOIN BOOKS ON BOOK_AUTHORS.ISBN13 = BOOKS.ISBN13")

    myresult = mycursor.fetchall()
    mycursor.close()
    mydb.close()

    return jsonify(myresult)


@app.route('/books/search', methods=['GET'])
def searchBooks():
    if 'search' in request.args:
        search = request.args['search']
    else:
        return "Error: No search field provided. Please specify an search."

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute(f"SELECT AUTHORS.NAME, BOOKS.TITLE, BOOKS.ISBN13, BOOKS.AVAILABLE FROM \
        AUTHORS INNER JOIN BOOK_AUTHORS ON AUTHORS.AUTHOR_ID = BOOK_AUTHORS.AUTHOR_ID \
        INNER JOIN BOOKS ON BOOK_AUTHORS.ISBN13 = BOOKS.ISBN13 \
        WHERE AUTHORS.NAME LIKE '%{search}%' OR BOOKS.TITLE LIKE '%{search}%' OR BOOKS.ISBN13 LIKE '%{search}%'")

    myresult = mycursor.fetchall()
    if myresult:
        myresult = pd.DataFrame(myresult)
        agg_functions = {'NAME': lambda x: ", ".join(x),
                         'TITLE': 'first',
                         'AVAILABLE': 'first'}

        myresult = myresult.groupby(
            'ISBN13', as_index=False).agg(agg_functions)
        myresult = myresult.to_dict('records')

    mycursor.close()
    mydb.close()
    return jsonify(myresult)


@app.route('/books/checkout', methods=['POST'])
def checkoutBook():
    
    if 'isbn13' not in request.json:
        return "Error: No ISBN provided. Please provide an ISBN."
    if 'card_id' not in request.json:
        return "Error: No CARD_ID provided. Please provide an CARD_ID."
    
    isbn13 = request.json['isbn13']
    card_id = request.json['card_id']
    date_out = datetime.now().date()
    due_date = date_out + timedelta(days = 7)

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute(f"SELECT AVAILABLE FROM BOOKS WHERE ISBN13 = '{isbn13}'")
    available = mycursor.fetchall()[0]['AVAILABLE']
    if available == 0:
        return "Book is already checked out!"

    mycursor.execute(f"SELECT COUNT(*) FROM BOOK_LOANS WHERE CARD_ID = '{card_id}'")
    no_of_books = mycursor.fetchall()[0]['COUNT(*)']
    print(no_of_books, type(no_of_books))

    if no_of_books == 3:
        return "User has borrowed more than 3 books!"

    mycursor.execute("INSERT INTO BOOK_LOANS (ISBN13, CARD_ID, DATE_OUT, DUE_DATE) VALUES (%s, %s, %s, %s)",
                     (isbn13, card_id, date_out, due_date))
    mydb.commit()
    
    mycursor.execute(f"UPDATE BOOKS SET AVAILABLE = 0 WHERE ISBN13 = {isbn13}")
    mydb.commit()

    mycursor.close()
    mydb.close()

    return 'OK'


app.run()
