const d = document;
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = d.querySelector("#email").value;
  const password = d.querySelector("#password").value;
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = Users.find(
    (user) => user.email === email && user.password === password
  );

  const emailAdmin = "admin@gmail.com";
  const passwordAdmin = "1234";

  if (email === emailAdmin && password === passwordAdmin) {
    console.log((window.location.href = "admin.php"));
  }
});
