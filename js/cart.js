const items = document.getElementById("cartList");
const envio = document.getElementById("envio");
const costos = document.getElementById("costos");
const subtotal = document.querySelector(".subtotal");
const shipCharge = document.querySelector(".envio");
const total = document.querySelector(".total");
const cNum = document.querySelector("#cNum");
const vence = document.querySelector("#vence");
const codSeg = document.querySelector("#codSeg");
const bAcc = document.querySelector("#bAcc");
const buyBtn = document.querySelector(".buyBtn");
const saveModalBtn = document.querySelector(".saveModalBtn");
const trashBtn = document.querySelector(".trashBtn");
const cCard = document.querySelector("#cCard");
const bTransfer = document.querySelector("#bTransfer");
const calle = document.getElementById("calle");
const esquina = document.getElementById("esquina");
const puerta = document.getElementById("puerta");

const templateItem = document.querySelector(".itemTemplate").content;
const templateCostos = document.querySelector(".template-costos").content;

const fragment = document.createDocumentFragment();

let arrayCart = [];
let carrito = {};
let shipChargePercent = 0.15;
let direccion = false;
let modal = false;
let modalInfo = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cart")) {
    arrayCart = JSON.parse(localStorage.getItem("cart"));
    //Object.assign(carrito,arrayCart)
    arrayCart.forEach((elem) => {
      carrito[elem.id] = { ...elem };
    });

    console.log(carrito);

    pintarCarrito();
  }
});

items.addEventListener("click", (e) => {
  delItem(e);
  changeCount(e);
});

const pintarCarrito = () => {
  items.innerHTML = "";
  Object.values(carrito).forEach((product) => {
    templateItem.querySelector("img").setAttribute("src", product.image);
    templateItem.querySelector(".nameSpan").textContent = product.name;
    templateItem.querySelector(
      ".unitCostSpan"
    ).textContent = `${product.currency} ${product.unitCost}`;
    templateItem.querySelector(".countInput").textContent = product.count;
    templateItem.querySelector(".subtotalSpan").textContent = `${
      product.currency
    } ${product.count * product.unitCost}`;
    templateItem.querySelector(".trashBtn").dataset.id = product.id;
    templateItem.querySelector(".sum").dataset.id = product.id;
    templateItem.querySelector(".sub").dataset.id = product.id;

    const clone = templateItem.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarCostos();
};

function pintarCostos() {
  let subt = 0;
  let tot = 0;
  let ship = 0;
  Object.values(carrito).forEach((elem) => {
    let price = elem.unitCost;
    if (elem.currency != "USD") {
      price = elem.unitCost / 40;
    }
    subt = Math.round(subt + price * elem.count);
    ship = Math.round(subt * shipChargePercent);
    tot = Math.round(subt + ship);
  });

  subtotal.innerHTML = `USD ${subt}`;
  shipCharge.innerHTML = `USD ${ship}`;
  total.innerHTML = `USD ${tot}`;
}

/*  */
const delItem = (e) => {
  if (e.target.classList.contains("trashBtn")) {
    delete carrito[e.target.dataset.id];
    localStorage.setItem("cart", JSON.stringify(Object.values(carrito)));
  }

  pintarCarrito();

  e.stopPropagation();
};

const changeCount = (e) => {
  if (e.target.classList.contains("sum")) {
    carrito[e.target.dataset.id].count++;
    localStorage.setItem("cart", JSON.stringify(Object.values(carrito)));

    pintarCarrito();

    e.stopPropagation();
  }

  if (e.target.classList.contains("sub")) {
    if (carrito[e.target.dataset.id].count > 1) {
      carrito[e.target.dataset.id].count--;
      localStorage.setItem("cart", JSON.stringify(Object.values(carrito)));
    }

    pintarCarrito();

    e.stopPropagation();
  }
};

/*  */

function setShipMethod(item) {
  if (item.id === "premium") {
    shipChargePercent = 0.15;
  }
  if (item.id === "express") {
    shipChargePercent = 0.07;
  }
  if (item.id === "standard") {
    shipChargePercent = 0.05;
  }

  pintarCarrito();
}

const resetModal = () => {
  cNum.value = "";
  codSeg.value = "";
  bAcc.value = "";
};
function setPaymentMethod(item) {
  resetModal();
  if (item.id === "cCard") {
    console.log(cCard.checked);
    cNum.disabled = false;
    vence.disabled = false;
    codSeg.disabled = false;
    /*  */
    bAcc.disabled = true;
  }
  if (item.id === "bTransfer") {
    console.log(bTransfer.checked);
    cNum.disabled = true;
    vence.disabled = true;
    codSeg.disabled = true;
    /*  */
    bAcc.disabled = false;
  }
}

function saveModal() {
  const ccAlert = () => {
    $(".ccAlert").removeClass("visually-hidden");
  };
  const btAlert = () => {
    $(".btAlert").removeClass("visually-hidden");
  };
  if (cCard.checked) {
    if (cNum.value != "" && codSeg.value != "") {
      console.log("ok");
      modal = true;

      $("#myModal").modal("hide");
    }

    if (cNum.value === "") {
      cNum.classList.add("border-danger");
      ccAlert();
    } else {
      cNum.classList.remove("border-danger");
    }
    if (codSeg.value === "") {
      codSeg.classList.add("border-danger");
      ccAlert();
    } else {
      codSeg.classList.remove("border-danger");
    }
  }

  if (bTransfer.checked) {
    if (bAcc.value === "") {
      bAcc.classList.add("border-danger");
      btAlert();
    } else {
      bAcc.classList.remove("border-danger");
      console.log("ok");
      modal = true;

      $("#myModal").modal("hide");
    }
  }
  $(".selecPagoFalta").addClass("visually-hidden");
}

/*  */
function succes() {
  localStorage.removeItem("cart");
  carrito = {};
  calle.value = "";
  esquina.value = "";
  puerta.value = "";
  direccion = false;
  modal = false;
  $(".alert-success").removeClass("visually-hidden");
  setTimeout(function () {
    location.reload();
  }, 2000);
}
function buy() {
  const falta = () => {
    $(".dirAlert").removeClass("visually-hidden");
  };

  if (calle.value === "") {
    calle.classList.add("border-danger");
    falta();
  } else {
    calle.classList.remove("border-danger");
  }
  if (esquina.value === "") {
    esquina.classList.add("border-danger");
    falta();
  } else {
    esquina.classList.remove("border-danger");
  }
  if (puerta.value === "") {
    puerta.classList.add("border-danger");
    falta();
  } else {
    puerta.classList.remove("border-danger");
  }

  if ((calle.value, esquina.value, puerta.value != "")) {
    $(".dirAlert").addClass("visually-hidden");
    direccion = true;
  }
  if (!modal) {
    $(".selecPagoFalta").removeClass("visually-hidden");
  }

  if (direccion && modal && !(localStorage.getItem("cart") === null)) {
    succes();
  }
}
