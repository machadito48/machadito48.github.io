let prodData = [];
let commentsArray = [];
let nCommentArray = [];
let sCount;

fetch(PRODUCT_INFO_URL)
  .then((response) => response.json())
  .then((data) => {
    prodData = data;
    showInfo();
    showImg();
    relatedProd();
  });

fetch(PRODUCT_INFO_COMMENTS_URL)
  .then((response) => response.json())
  .then((data) => {
    commentsArray = data;
    showComments(commentsArray, ".comments");
  });

/* -------------------------------- */

function showInfo() {
  let toHTML = "";

  toHTML += `
    <div class="container">
      <div class="border-bottom row">
        <h2 class="py-4 col-6">${prodData.name}</h2>
        <div class="col-6 align-self-center text-center"><button type="button" class="btn btn-success" id="btnComprar" onclick="comprar(this)">Comprar</button></div>
      </div>
    </div>

    <div class="container my-4">
      <span class="fw-bold">Precio</span>
      <p>${prodData.currency + " " + prodData.cost}</p>

      <span class="fw-bold">Descripción</span>
      <p>${prodData.description}</p>

      <span class="fw-bold">Categoria</span>
      <p>${prodData.category}</p>

      <span class="fw-bold">Ventas</span>
      <p>${prodData.soldCount}</p>

      <span class="fw-bold">Imagenes ilustrativas</span>


      <div id="carouselExampleControls" class="carousel slide w-50" data-bs-ride="carousel">
        <div class="carousel-inner imgList">
          

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="imgList2 d-flex">
      </div >


      <h2 class="border-bottom titleComentarios mt-4">Comentarios</h2>
      <div class="comments">

      </div>
      <div class="nComments">

      </div>
    </div>
    `;

  document.querySelector(".prodContainer").innerHTML = toHTML;
}
function comprar(item){
  console.log("hola")
}
/* -------------------------------- */

function showImg() {
  let toImgList = "";
  for (let i = 0; i < prodData.images.length; i++) {
    const element = prodData.images[i];
    toImgList += `
    <div class="carousel-item">
      <img src="${element}" class="d-block w-100">
    </div>
    `;

    document.querySelector(".imgList").innerHTML = toImgList;
  }

  document.querySelector(".imgList").firstElementChild.classList.add("active")
  
}
/* -------------------------------- */

function showComments(array, loc) {
  let toHTML = "";

  array.forEach((element) => {
    toHTML += `
    <span class="fw-bold">${element.user} - </span>
    <span class="text-muted">${element.dateTime} - </span>
    `;
    for (let i = 0; i < 5; i++) {
      if (i < element.score) {
        toHTML += `
        <span class="fa fa-star checked"></span>
        `;
      } else {
        toHTML += `<span class="fa fa-star"></span>`;
      }
    }
    toHTML += `
    <p class="border-bottom">${element.description}</p>
    `;
  });

  document.querySelector(loc).innerHTML = toHTML;
}
/* -------------------------------- */

function newComment() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  let usuario = localStorage.getItem("user");
  let descrip = document.getElementById("commentInput").value;
  nCommentArray = [
    { user: usuario, dateTime: today, description: descrip, score: sCount },
  ];

  showComments(nCommentArray, ".nComments");

  document.getElementById("commentInput").value = "";
}
/* -------------------------------- */

function calificar(item) {
  sCount = item.id;
  //console.log(count)
  for (let i = 0; i < 5; i++) {
    if (i < sCount) {
      document.getElementById(i + 1).style.color = "#FFB122";
    } else {
      document.getElementById(i + 1).style.color = "black";
    }
  }
}
/* -------------------------------- */


function relatedProd() {
  let toHTML ="";
  
  for (let i = 0; i < prodData.relatedProducts.length; i++) {
    const element = prodData.relatedProducts[i];
    toHTML += `
    <div id="${element.id}" class="card cursor-active" onclick="showRelatedInfo(this)">
    <img class='img-thumbnail' src="${element.image}" width="auto" height="auto"/>
    <div class="card-body text-center mx-auto">
    <h5 class="card-title">${element.name}</h5>
    </div>
    </div>
    `;
    
    document.querySelector(".relatedCards").innerHTML = toHTML;
  }
}

function showRelatedInfo(item){
  localStorage.setItem("prodID", item.id);
  location.reload(); 
}
/* -------------------------------- */

const jsonData = await fetch(PRODUCT_INFO_URL).then((response) => response.json());
console.log(jsonData)



/* 

filtersArray = filtersArray.filter(
      (product) =>
        product.name.toLowerCase().includes(txtSearch.value.toLowerCase()) ||
        product.description.toLowerCase().includes(txtSearch.value.toLowerCase())
    );

*/
























/* -------------------------------- */
/* function showImg() {
  let toImgList = "";
  for (let i = 0; i < prodData.images.length; i++) {
    const element = prodData.images[i];
    toImgList += `
      <img src="${element}" class="img-thumbnail w-25 cursor-active">
    `;

    document.querySelector(".imgList").innerHTML = toImgList;
  }
} 


*/


