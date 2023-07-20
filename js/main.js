const submitButton = document.querySelector(".submit");
const close = document.getElementById("xmark");
const siteName = document.getElementById("siteName");
const siteUrl = document.getElementById("siteUrl");
const tableBody = document.getElementById("tableBody");
const dialog = document.querySelector("dialog");
const hambozo = document.getElementsByClassName("hambozo");
let website = {};
let websites = [];
let flag = true;
if (localStorage.getItem("links") != null) {
  websites = JSON.parse(localStorage.getItem("links"));
  display();
}
siteName.addEventListener("keyup", () => {
  website = {
    Name: siteName.value,
    url: siteUrl.value,
  };
  document.querySelector(".alert").classList.add("opacity-0");
  hambozo[0].classList.add("fa-circle-exclamation", "text-danger");
  document.querySelector(
    "#siteName:focus"
  ).style.cssText = `box-shadow: 1px 0px 1px 3px rgba(255,0,0,0.5) !important;`;
  if (website.Name.length > 2) {
    hambozo[0].classList.remove("fa-circle-exclamation", "text-danger");
    hambozo[0].classList.add("fa-circle-check", "text-success");

    document.querySelector(
      "#siteName:focus"
    ).style.cssText = `box-shadow: 1px 0px 1px 3px #4BB543 !important;`;
  }
});

siteUrl.addEventListener("keyup", () => {
  website = {
    Name: siteName.value,
    url: siteUrl.value,
  };
  hambozo[1].classList.add("fa-circle-exclamation", "text-danger");
  document.querySelector(
    "#siteUrl:focus"
  ).style.cssText = `box-shadow: 1px 0px 1px 3px rgba(255,0,0,0.5) !important;`;
  if (validateUrl(website.url)) {
    hambozo[1].classList.remove("fa-circle-exclamation", "text-danger");
    hambozo[1].classList.add("fa-circle-check", "text-success");

    document.querySelector(
      "#siteUrl:focus"
    ).style.cssText = `box-shadow: 1px 0px 1px 3px #4BB543 !important;`;
  }
});

submitButton.addEventListener("click", () => {
  website = {
    Name: siteName.value,
    url: siteUrl.value,
  };
  if (validateUrl(website.url) && website.Name.length >= 3) {
    for (let i = 0; i < websites.length; i++) {
      if (website.Name === websites[i].Name) flag = false;
    }
    if (flag == true) {
      websites.push(website);
      localStorage.setItem("links", JSON.stringify(websites));
      display();
      clear();
      window.location = "index.html";
      document.querySelector(
        "#siteName:focus"
      ).style.cssText = `box-shadow: 1px 0px 1px 3px #fec260 !important;`;

      document.querySelector(
        "#siteUrl:focus"
      ).style.cssText = `box-shadow: 1px 0px 1px 3px #fec260 !important;`;
    } else {
      document.querySelector(".alert").classList.remove("opacity-0");
    }
  } else {
    dialog.showModal();
  }
  flag = true;
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
