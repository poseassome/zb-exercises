const API_URL = "https://jsonplaceholder.typicode.com/users";
fetch(API_URL)
  .then((response) => response.json())
  .then((json) => {
    const list = document.querySelector(".user-list");
    const cont = json.map(
      (data) => `<li><b>name:</b> ${data.name}</br>
    <b>email:</b> ${data.email}</br>
    <b>phone:</b> ${data.phone}</li></br>`
    );
    list.innerHTML = cont.join(" ");
  });
