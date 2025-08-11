from flask import Flask, render_template, request, redirect, url_for, flash, session
from database.mongodb.user_db import *
import os

app = Flask(__name__)
app.secret_key = "myKey"  # Needed for session & flash



# Home page
@app.route('/')
def home():
    return render_template('home.html')

# Dashboard
@app.route('/dashboard')
def dashboard():
    if 'user' in session:
        return f"<h1>Welcome {session['user']['first_name']}!</h1>"
    flash("Please log in first!", "warning")
    return redirect(url_for('login'))

# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = get_user_by_email(email)

        if user and user['password'] == password:
            session['user'] = {
                "first_name": user['first_name'],
                "last_name": user['last_name'],
                "email": user['email']
            }
            flash(f"Welcome back, {user['first_name']}!", "success")
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid email or password!", "danger")
            return redirect(url_for('login'))

    return render_template('login.html')

# Signup
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        i_pass = request.form['password']
        c_pass = request.form['confirmPassword']

        if i_pass != c_pass:
            flash("Passwords do not match!", "danger")
            return redirect(url_for('signup'))

        if get_user_by_email(email):
            flash("Email already registered! Please log in.", "warning")
            return redirect(url_for('login'))

        add_user(first_name, last_name, email, i_pass)
        flash("Account created successfully! Please log in.", "success")
        return redirect(url_for('login'))

    return render_template('signup.html')

# Logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("You have been logged out!", "info")
    return redirect(url_for('login'))



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
