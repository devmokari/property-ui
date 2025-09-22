// Change this to your deployed API base URL
const API_URL = "https://g7eku3ruwr6e2hduscxavmi6zy0wsiel.lambda-url.ap-southeast-2.on.aws/";

// Generic API caller
async function apiCall(action, payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

// --- Autocomplete ---
async function fetchSuggestions(query) {
  const box = document.getElementById("suggestions");
  box.innerHTML = "";
  if (query.length < 3) return;

  try {
    const data = await apiCall("autocomplete", { text: query });
    if (data.suggestions) {
      const unique = [...new Set(data.suggestions)];
      box.innerHTML = "";
      unique.forEach((s) => {
        const div = document.createElement("div");
        div.textContent = s;
        div.onclick = () => {
          document.getElementById("addressInput").value = s;
          box.innerHTML = "";
        };
        box.appendChild(div);
      });
    }
  } catch (err) {
    console.error("autocomplete error", err);
    box.innerHTML = `<div style="color:red; padding:5px;">Failed to load suggestions</div>`;
  }
}

// --- Property search ---
async function getEstimate() {
    const address = document.getElementById("addressInput").value.trim();
    if (!address) return alert("Please enter an address");
  
    try {
      const data = await apiCall("getProperty", { address });
  
      const output = document.getElementById("output");
      const title = document.getElementById("propertyTitle");
      const details = document.getElementById("propertyDetails");
      const raw = document.getElementById("rawResponse");
  
      title.textContent = data.address || address || "Property Details";
      details.innerHTML = "";
  
      // --- Images ---
      if (Array.isArray(data.images) && data.images.length > 0) {
        const imgHtml = data.images
          .map((url) => `<img src="${url}" class="property-img"/>`)
          .join("");
        details.innerHTML += `<div class="image-gallery">${imgHtml}</div>`;
      }
  
      // --- Price range ---
      if (data.estimated_value_aud) {
        const low = data.price_lower_bound ? `$${data.price_lower_bound}` : "—";
        const high = data.price_upper_bound ? `$${data.price_upper_bound}` : "—";
        details.innerHTML += `<div><i class="fa-solid fa-dollar-sign"></i> ${low} – ${high}</div>`;
      }
  
      if (data.bedrooms) {
        details.innerHTML += `<div><i class="fa-solid fa-bed"></i> ${data.bedrooms}</div>`;
      }
  
      if (data.bathrooms) {
        details.innerHTML += `<div><i class="fa-solid fa-bath"></i> ${data.bathrooms}</div>`;
      }
  
      if (data.car_spaces) {
        details.innerHTML += `<div><i class="fa-solid fa-car"></i> ${data.car_spaces}</div>`;
      }
  
      if (data.lot_size_m2) {
        details.innerHTML += `<div><i class="fa-solid fa-vector-square"></i> ${data.lot_size_m2} m²</div>`;
      }
  
      if (data.property_type) {
        details.innerHTML += `<div><i class="fa-solid fa-house"></i> ${data.property_type}</div>`;
      }
  
      if (data.council) {
        details.innerHTML += `<div><i class="fa-solid fa-city"></i> ${data.council}</div>`;
      }
  
      if (data.internet) {
        details.innerHTML += `<div><i class="fa-solid fa-wifi"></i> ${data.internet}</div>`;
      }
  
      if (Array.isArray(data.overlays) && data.overlays.length > 0) {
        const overlayList = data.overlays.map((o) => `<li>${o}</li>`).join("");
        details.innerHTML += `<div><i class="fa-solid fa-layer-group"></i><ul>${overlayList}</ul></div>`;
      }
  
      if (Array.isArray(data.zoning_schools) && data.zoning_schools.length > 0) {
        const schoolList = data.zoning_schools.map((s) => `<li>${s}</li>`).join("");
        details.innerHTML += `<div><i class="fa-solid fa-school"></i><ul>${schoolList}</ul></div>`;
      }
  
      // --- Raw JSON ---
      raw.textContent = JSON.stringify(data, null, 2);
      output.style.display = "block";
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  }
  

function toggleRaw() {
  const raw = document.getElementById("rawResponse");
  raw.style.display = raw.style.display === "none" ? "block" : "none";
}
