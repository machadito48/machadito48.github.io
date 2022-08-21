function logSuccess() {
  localStorage.setItem("login", "login");
  window.location.href = "index.html";
}

function logError() {
  document.getElementById("alert-danger").classList.add("show");
}

function checkCred() {
  let emailInput = document.getElementById("email").value;
  let passInput = document.getElementById("password").value;
  let checkbox = document.getElementById("connected");
    console.log(emailInput)
    console.log(passInput)
    console.log(checkbox)
  if (emailInput.lenght ===0 || passInput.lenght === 0 || !checkbox.checked) {
    logError();
    return;
  } 
  logSuccess();
}

