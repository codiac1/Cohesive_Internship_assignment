# Cohesive_Internship_assignment
### **This a simple budget-tracking application using Django and React.**

The application has following features:

### **Backend (Django)**

- REST API for
    - List of known users (friends)
    - Creating, updating, and deleting transactions.  the list of transactions.
- The transaction should be associated with a set of users to split it across. Users can/cannot be a member. It should also have a spending category
- Use Django's built-in authentication system to authenticate users
- Use Django's built-in ORM to store the data in an SQLite database

### **Frontend (React)**

- The user interface should display the list of transactions and allow the user to filter the transactions by date and category.
- The user interface should display the total amount spent and the budget remaining based on the transactions.
- The application should have a simple user interface for creating, updating, and deleting transactions.
- The application should also show who owes you or who you owe.

### **TO Run the application :**

- To run the app we need to have node and django installed on the system.

> pip install django

- In a separate command prompt run the following command.

> npm install react react-dom react-bootstrap

- Now navigate to the root directory of Django project (containing the manage.py file) in a command prompt.
  Run the following command to start the Django development server:

> python manage.py runserver

- This will start the server at http://127.0.0.1:8000/. You can access the Django REST API at this address.
- In a separate command prompt, navigate to the root directory of React frontend (containing the package.json file).
  Run the following command to start the React development server:

> npm start

- This will start the server at http://localhost:3000/. You can access the React user interface at this address.

### Thanks for your time.



