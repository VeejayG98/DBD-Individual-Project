from crypt import methods
from datetime import datetime, timedelta
from matplotlib.style import available
import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS
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
CORS(app)


@app.route('/books/all', methods=['GET'])
def getBooks():

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute("SELECT AUTHORS.NAME, BOOKS.TITLE, BOOKS.ISBN13, BOOKS.AVAILABLE FROM \
    AUTHORS INNER JOIN BOOK_AUTHORS ON AUTHORS.AUTHOR_ID = BOOK_AUTHORS.AUTHOR_ID \
    INNER JOIN BOOKS ON BOOK_AUTHORS.ISBN13 = BOOKS.ISBN13 \
    ORDER BY BOOKS.ISBN13 DESC")

    myresult = mycursor.fetchall()
    myresult = pd.DataFrame(myresult)
    agg_functions = {'NAME': lambda x: ", ".join(x),
                    'TITLE': 'first',
                    'AVAILABLE': 'first'}

    myresult = myresult.groupby(
        'ISBN13', as_index=False).agg(agg_functions)
    myresult = myresult.to_dict('records')

    mycursor.close()
    mydb.close()

    return jsonify(myresult), 200


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
    due_date = date_out + timedelta(days=7)


    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute("SELECT CARD_ID FROM BORROWERS")
    # print(mycursor.fetchall())
    card_ids = set([i['CARD_ID'] for i in mycursor.fetchall()])

    if card_id not in card_ids:
        return {"error": "Card Number not present in the system!"}, 400


    mycursor.execute(f"SELECT AVAILABLE FROM BOOKS WHERE ISBN13 = '{isbn13}'")
    available = mycursor.fetchall()[0]['AVAILABLE']
    if available == 0:
        return {"error": "Book is already checked out!"}, 400

    mycursor.execute(
        f"SELECT COUNT(*) FROM BOOK_LOANS WHERE CARD_ID = '{card_id}' AND DATE_IN IS NULL")
    no_of_books = mycursor.fetchall()[0]['COUNT(*)']
    print(no_of_books, type(no_of_books))

    if no_of_books == 3:
        return {"error": "User has borrowed more than 3 books!"}, 400


    mycursor.execute("INSERT INTO BOOK_LOANS (ISBN13, CARD_ID, DATE_OUT, DUE_DATE) VALUES (%s, %s, %s, %s)",
                     (isbn13, card_id, date_out, due_date))
    mydb.commit()

    mycursor.execute(f"UPDATE BOOKS SET AVAILABLE = 0 WHERE ISBN13 = {isbn13}")
    mydb.commit()

    mycursor.close()
    mydb.close()

    return 'OK', 200


@app.route('/books/checkin', methods=['POST'])
def checkinBook():
    if 'loan_id' not in request.json:
        return "Error: No LOAN_ID provided. Please provide an LOAN_ID."

    loan_id = request.json['loan_id']
    date_in = datetime.now().date()

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary=True)

    mycursor.execute(
        f"UPDATE BOOK_LOANS SET DATE_IN = '{date_in}' WHERE LOAN_ID = '{loan_id}'")
    mydb.commit()
    mycursor.execute(f"UPDATE BOOKS SET AVAILABLE = 1 WHERE \
                        ISBN13 = (SELECT BOOKS.ISBN13 FROM \
                        BOOK_LOANS WHERE LOAN_ID = {loan_id})")
    mydb.commit()

    mycursor.close()
    mydb.close()

    return 'OK'

@app.route('/borrowers/addnew', methods = ['POST'])
def addNewBorrowers():
    parameters = ['first_name', 'last_name', 'ssn', 'address', 'city', 'state']
    for parameter in parameters:
        if parameter not in request.json:
            return "Error: Please fill in the name, ssn and address fields!"

    first_name = request.json['first_name']
    last_name = request.json['last_name']
    ssn = request.json['ssn']
    address = request.json['address']
    city = request.json['city']
    state = request.json['state']

    phone = request.json.get("phone", None)
    email = request.json.get("email", None)

    mydb = connectSQLDB()
    mycursor = mydb.cursor(dictionary = True)
    
    mycursor.execute("SELECT CARD_ID FROM BORROWERS \
                ORDER BY CARD_ID DESC LIMIT 1")
    latestID = mycursor.fetchall()[0]['CARD_ID']
    newID = int(latestID[2:]) + 1
    newID = f"ID{newID:06}"

    try:
        mycursor.execute("INSERT INTO BORROWERS (CARD_ID, SSN, FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, CITY, STATE, PHONE) \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (newID, ssn, first_name, last_name, email, address, city, state, phone)
        )
        mydb.commit()

    except Exception as e:
        return str(e)

    mycursor.close()
    mydb.close()

    return "Test OK"

app.run()
