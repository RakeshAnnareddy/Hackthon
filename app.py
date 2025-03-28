from flask import Flask, render_template, jsonify, redirect, url_for, session, request
import json
from flask_cors import CORS
import requests
import os

app = Flask(__name__, static_folder="static")
CORS(app)  # Enable CORS for frontend requests
app.secret_key = 'travelwithguru2k25@2728'  # Set a secret key for session management

# Load data from JSON files
def load_data(filename):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return {"error": f"{filename} not found."}
    except json.JSONDecodeError:
        return {"error": f"Error decoding JSON from {filename}."}

def dist_data():
    return load_data("dist_data.json")
    
# Home route with session check
@app.route("/")
def home():
    # Check if the user is logged in
    if 'user' in session:
        return render_template("index.html", logged_in=True, user=session['user'])
    else:
        return render_template("index.html", logged_in=False)

# Contact route
@app.route("/contact")
def contact():
    return render_template("contact.html")

# Explore route
@app.route("/explore")
def explore():
    return render_template("explore.html")

@app.route("/guide")
def guide():
    return render_template("guide.html")

# API route to get places data
@app.route("/api/places")
def get_places():
    data = load_data("data.json")  # Fetch data from JSON file
    return jsonify(data)

# API route for exploring places data
@app.route("/api/explore-places")
def get_explore_places():
    data = dist_data()  # Fetch data from dist_data.json
    return jsonify(data)

# Logout route to clear the session
@app.route("/logout")
def logout():
    session.pop('user', None)  # Remove user from session
    return redirect(url_for('home'))  # Redirect to home page after logout

# Firebase Authentication callback route
@app.route("/auth-callback", methods=["POST"])
def auth_callback():
    id_token = request.json.get('idToken')  # The ID token sent from the frontend
    
    if not id_token:
        return jsonify({"error": "ID token is required"}), 400

    # Verify the Firebase ID token by calling Firebase Auth API
    url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAJP-89oRbIhTJkB_kInDNav106vn_3Saw"
    response = requests.post(url, json={"idToken": id_token})

    if response.status_code == 200:
        user_data = response.json()
        # Store the user data in the session
        session['user'] = user_data['users'][0]
        return jsonify({"message": "Authentication successful!"}), 200
    else:
        return jsonify({"error": "Invalid ID token"}), 400

# Dynamic route to render district-specific HTML pages
@app.route('/places.html')
def places():
    district = request.args.get('district')
    if district:
        # Check if the district-specific HTML file exists
        if os.path.exists(f'templates/{district}.html'):
            return render_template(f'{district}.html')
        return render_template('404.html', error="District page not found.")
    return redirect(url_for('home'))  # If no district provided, redirect to home

if __name__ == "__main__":
    app.run(debug=True)
