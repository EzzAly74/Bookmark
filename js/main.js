const submitButton = document.querySelector(".submit");
const close = document.getElementById("xmark");
const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteUrl");
const tableBody = document.getElementById("tableBody");
const dialog = document.querySelector("dialog");
let website = {};
let websites = [];
if (localStorage.getItem("links") != null) {
  websites = JSON.parse(localStorage.getItem("links"));
  display();
}

submitButton.addEventListener("click", () => {
  website = {
    Name: siteName.value,
    url: siteUrl.value,
  };
  if (validateUrl(website.url) && website.Name.length >= 3) {
    websites.push(website);
    localStorage.setItem("links", JSON.stringify(websites));
    display();
    clear();
  } else {
    dialog.showModal();
  }
});

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
function display() {
  var total = ``;
  for (var i = 0; i < websites.length; i++) {
    total += `    
    <tr>
              <td>${i + 1}</td>
              <td>${websites[i].Name}</td>
              <td>
                <button class="btn btn-success" onclick = "visit(${i})">
                  <i class="fa-solid fa-eye"></i> Visit
                </button>
              </td>
              <td>
                <button class="btn btn-danger deleteItem"onclick="deleteItem(${i})">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
    `;
  }

  tableBody.innerHTML = total;
}
function deleteItem(index) {
  websites.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(websites));
  display();
}
function validateUrl(s) {
  let regex =
    /^(https?:\/\/)?[a-zA-Z0-9]{2,255}\.[^-][a-zA-Z0-9-]{1,64}(\.[a-zA-Z]{3,64})?$/;
  return regex.test(s);
}
function visit(index) {
  var url = websites[index].url;
  if (url.includes("https://") || url.includes("http://"))
    window.open(url, "_blank");
  else window.open("https://" + url, "_blank");
}
