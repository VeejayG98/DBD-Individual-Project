# DBD-Individual-Project
A Full Stack Application for Library Management. This library software supports searching for books, checking out and checking in a book, adding a new borrower into the system and managing and paying fines for late borrowers.


## Compilation Instructions

To execute the full-stack application the following steps are to be followed:

### **Backend Code Compilation**

To get the backend API code running, we need to do the following:

1. Install the required packages to run the code using the following command:

        pip3 install -r requirements.txt

                        or

        pip install -r requirements.txt

2. Then we need to install the mysql-connector for python. Run the following command:

        pip install mysql-connector-python


3. To execute the backend API code, please run the sqlBackendAPI.py using the following command on the terminal:


        python sqlBackendAPI.py

### **Frontend Code Compilation**

To start the frontend interface, the following steps must be performed.

1. We need to install the node modules to start our frontend interface. cd into the frontend directory and run the following on the terminal.
    
        npm install

2. After installing the node modules, to start the frontend interface, run the following line on the terminal.

        npm start

# Screenshots

## Check out/Homepage

![Check out page](screenshots/Checkout.png)

## Check in page

![Check in page](screenshots/Check%20in.png)

## View Fines page

![View Fines page](screenshots/View%20Fines.png)

## Pay Fines page

![Pay Fines page](screenshots/Pay%20Fines.png)

## Borrower Signup page

![Borrower Signup page](screenshots/Signup.png)