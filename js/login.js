function logSuccess() {
  localStorage.setItem("login", "login");
  window.location.href = "index.html";
}

function logError() {
  var inp1 = document.getElementById("email");
  var inp2 = document.getElementById("password");
  inp1.classList.add("")
}

function checkCred() {
  let emailInput = document.getElementById("email").value;
  let passInput = document.getElementById("password").value;
  let checkbox = document.getElementById("connected");
    console.log(emailInput)
    console.log(passInput)
  if (emailInput ==="") {
    logError();
    return;
  } 
  if (passInput ===""){
    logError();
    return;
  }
  
  logSuccess();
}

