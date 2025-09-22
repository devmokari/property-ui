// Change this to your deployed API base URL
const API_URL = "https://g7eku3ruwr6e2hduscxavmi6zy0wsiel.lambda-url.ap-southeast-2.on.aws/";

async function fetchSuggestions(query) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";
  if (query.length < 3) return;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "autocomplete", text: query }),
    });
    const data = await res.json();

    if (data.suggestions) {
      data.suggestions.forEach((s) => {
        const div = document.createElement("div");
        div.textContent = s;
        div.onclick = () => {
          document.getElementById("addressInput").value = s;
          box.innerHTML = "";
        };
        box.appendChild(div);
      });
    }
  } catch (e) {
    console.error("autocomplete error", e);
  }
}

async function getEstimate() {
  const address = document.getElementById("addressInput").value.trim();
  if (!address) return alert("Please enter an address");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getProperty", address }),
    });
    const data = await res.json();

    const output = document.getElementById("output");
    const title = document.getElementById("propertyTitle");
    const details = document.getElementById("propertyDetails");
    const raw = document.getElementById("rawResponse");

    title.textContent = data.address || address || "Property Details";
    details.innerHTML = "";

    if (data.estimated_value_aud) {
      details.innerHTML += `<div><i class="fa-solid fa-dollar-sign"></i> Estimated: AUD ${data.estimated_value_aud}</div>`;
    }
    if (data.bedrooms) {
      details.innerHTML += `<div><i class="fa-solid fa-bed"></i> ${data.bedrooms} bedrooms</div>`;
    }
    if (data.bathrooms) {
      details.innerHTML += `<div><i class="fa-solid fa-bath"></i> ${data.bathrooms} bathrooms</div>`;
    }

    raw.textContent = JSON.stringify(data, null, 2);
    output.style.display = "block";
  } catch (err) {
    alert("Error: " + err.message);
  }
}

function toggleRaw() {
  const raw = document.getElementById("rawResponse");
  raw.style.display = raw.style.display === "none" ? "block" : "none";
}
