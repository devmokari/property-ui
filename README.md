# 🏡 Property UI

`property-ui` is a **static web frontend** for the Property Finder app.  
It provides a simple user interface for **address autocomplete** and **property details lookup**, powered by a backend Property API.

---

## ✨ Features

- 🔍 Autocomplete addresses with live API calls
- 🏠 Display property details: estimated value, bedrooms, bathrooms, car spaces, lot size, property type, council, internet, and schools
- 🖼️ Show property images when available
- 📑 Toggle raw JSON for debugging
- 🎨 Simple styling with **CSS** and **Font Awesome icons**

---

## 📂 Project Structure

```
property-ui/
│── index.html      # Main UI
│── styles.css      # Styling
│── app.js          # JavaScript logic (calls backend API)
│── README.md       # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/property-ui.git
cd property-ui
```

### 2. Configure API endpoint

Edit **`app.js`** and set your backend API URL:

```javascript
const API_URL = "https://your-property-api.com";
```

This should be the endpoint of your backend (Flask app on AWS Lambda, EKS, EC2, etc.).

### 3. Run locally

Simply open `index.html` in your browser.  
For development, it’s better to serve with a lightweight web server to avoid CORS issues:

```bash
# Using Python 3 built-in server
python3 -m http.server 8080
```

Now open 👉 [http://localhost:8080](http://localhost:8080)

---

## 🌐 Deploy to GitHub Pages

1. Commit and push this repo to GitHub.
2. Go to **Settings → Pages → Source** → select `main` branch and `/ (root)`.
3. Your static site will be live at:
   ```
   https://<username>.github.io/property-ui/
   ```

---

## 🧪 Example Workflow

1. Type at least 3 characters of an address → suggestions appear.
2. Select a suggestion → property details are fetched from the API.
3. Results include images, estimated price, features, and nearby schools.
4. The raw JSON response can be toggled for debugging.

---

## 📜 License

This project is licensed under the MIT License – feel free to use and modify.
