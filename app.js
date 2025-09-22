const API_URL = "https://g7eku3ruwr6e2hduscxavmi6zy0wsiel.lambda-url.ap-southeast-2.on.aws/";

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

async function fetchSuggestions(query) {
  if (query.length < 3) {
    clearSuggestions();
    return;
  }
  try {
    showLoadingSuggestions(); 
    const data = await apiCall("autocomplete", { text: query });
    renderSuggestions(data.suggestions || []);
  } catch (err) {
    console.error("autocomplete error", err);
    showSuggestionError("Could not load suggestions");
  } finally {
    hideLoadingSuggestions();
  }
}

async function getEstimate() {
  const address = document.getElementById("addressInput").value.trim();
  if (!address) {
    showError("Enter address");
    return;
  }
  try {
    showLoadingEstimate();
    const data = await apiCall("getProperty", { address });
    renderEstimate(data);
  } catch (err) {
    showError("Could not load property details");
    console.error(err);
  } finally {
    hideLoadingEstimate();
  }
}

// then helper UI stuff: renderSuggestions, renderEstimate, showError, showLoading...

