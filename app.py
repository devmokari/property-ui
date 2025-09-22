from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)

PROPERTY_API_URL = os.getenv("PROPERTY_API_URL")  # e.g. https://xxxx.lambda-url...

@app.route("/", methods=["GET", "POST"])
def home():
    suggestions = []
    property_data = None
    address = ""

    if request.method == "POST":
        address = request.form.get("address", "").strip()

        # Autocomplete if input length >= 3 and no final selection yet
        if len(address) >= 3 and "select" not in request.form:
            try:
                resp = requests.get(f"{PROPERTY_API_URL}/autocomplete",
                                    params={"text": address}, timeout=5)
                resp.raise_for_status()
                suggestions = resp.json().get("suggestions", [])
            except Exception as e:
                suggestions = [f"Error fetching suggestions: {e}"]

        # Property lookup if final selection made
        if "select" in request.form:
            try:
                resp = requests.post(f"{PROPERTY_API_URL}/property",
                                     json={"address": address}, timeout=10)
                resp.raise_for_status()
                property_data = resp.json()
            except Exception as e:
                property_data = {"error": str(e)}

    return render_template("index.html",
                           address=address,
                           suggestions=suggestions,
                           property=property_data)

if __name__ == "__main__":
    app.run(debug=True)
