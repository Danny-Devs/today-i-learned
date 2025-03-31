
const form = document.querySelector(".fact-form");
const shareButton = document.querySelector(".btn-share");
const factsList = document.querySelector(".facts-list");

// hide form by default
form.classList.add("hidden");

const res = await fetch("https://uzoqdqpyzewlsduqmexx.supabase.co/rest/v1/facts", {
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6b3FkcXB5emV3bHNkdXFtZXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NDYyNDQsImV4cCI6MjA1OTAyMjI0NH0.GOdISKZh_8d-xqBq41CIivRB-rstQ7UwLUB19RNs5S4",
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6b3FkcXB5emV3bHNkdXFtZXh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NDYyNDQsImV4cCI6MjA1OTAyMjI0NH0.GOdISKZh_8d-xqBq41CIivRB-rstQ7UwLUB19RNs5S4"
  }
})
const data = await res.json();
console.log(data);

// when Share button is clicked, show form
shareButton.addEventListener("click", function () {
  console.log("Share button clicked");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    shareButton.textContent = "Close";
  } else {
    form.classList.add("hidden");
    shareButton.textContent = "Share a fact";
  }
});

// when form is submitted, hide form
form.addEventListener("submit", function () {
  console.log("Form submitted");
  if (!form.classList.contains("hidden")) {
    form.classList.add("hidden");
    shareButton.textContent = "Share a fact";
  }
});

