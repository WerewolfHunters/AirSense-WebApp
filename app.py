from flask import Flask, render_template, request, redirect, url_for, flash, session



app = Flask(__name__)
app.secret_key = "myKey"  # Needed for session & flash



# Home page
@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')


# Dashboard
@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user' in session:
        return f"<h1>Welcome {session['user']['first_name']}!</h1>"
    else:
        flash("Please log in first!", "warning")
        return redirect(url_for('login'))


# Login page
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        users = session.get('users', {})  # Retrieve stored users

        if email in users and users[email]['password'] == password:
            session['user'] = users[email]  # Store logged-in user
            return redirect(url_for('dashboard'))
        else:
            flash("Invalid email or password!", "danger")
            return redirect(url_for('login'))
    
    return render_template('login.html')


# Signup page
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        i_pass = request.form['password']
        c_pass = request.form['confirmPassword']

        # Check password match
        if i_pass != c_pass:
            flash("Passwords do not match!", "danger")
            return redirect(url_for('signup'))

        users = session.get('users', {})

        if email in users:
            flash("Email already registered! Please log in.", "warning")
            return redirect(url_for('login'))

        # Store user in session
        users[email] = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": i_pass
        }
        session['users'] = users

        flash("Account created successfully! Please log in.", "success")
        return redirect(url_for('login'))

    return render_template('signup.html')


# Logout route
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("You have been logged out!", "info")
    return redirect(url_for('login'))



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
