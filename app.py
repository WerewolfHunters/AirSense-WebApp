from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        return f"<h1>{email}:{password}</h1>"
    
    return render_template('login.html')


if __name__=="__main__":
    app.run(host="0.0.0.0", port=8080)