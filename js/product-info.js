let prodData = [];
let commentsArray = [];
let nCommentArray=[];
let sCount;

fetch(PRODUCT_INFO_URL)
  .then((response) => response.json())
  .then((data) => {
    prodData = data;
    showInfo();
    showImg();
  });

fetch(PRODUCT_INFO_COMMENTS_URL)
  .then((response) => response.json())
  .then((data) => {
    commentsArray = data;
    showComments(commentsArray, ".comments");
    //console.log(commentsArray)
  });

/* -------------------------------- */

function showInfo() {
  let toHTML = "";

  toHTML += `
    <div class="container">
      <h2 class="border-bottom py-4">${prodData.name}</h2>
    </div>

    <div class="container">
      <span class="fw-bold">Precio</span>
      <p>${prodData.currency + " " + prodData.cost}</p>

      <span class="fw-bold">Descripción</span>
      <p>${prodData.description}</p>

      <span class="fw-bold">Categoria</span>
      <p>${prodData.category}</p>

      <span class="fw-bold">Ventas</span>
      <p>${prodData.soldCount}</p>

      <span class="fw-bold">Imagenes ilustrativas</span>
      <div class="imgList d-flex">
      
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
/* -------------------------------- */

function showImg() {
  let toImgList = "";
  for (let i = 0; i < prodData.images.length; i++) {
    const element = prodData.images[i];
    toImgList += `
      <img src="${element}" class="img-thumbnail w-25">
    `;
    document.querySelector(".imgList").innerHTML = toImgList;
    /*  */
  }
}
/* -------------------------------- */

function showComments(array,loc) {
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
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  let usuario = localStorage.getItem("user")
  let descrip = document.getElementById("commentInput").value;
  nCommentArray = [{user:usuario, dateTime:today, description:descrip, score:sCount}]

  showComments(nCommentArray, ".nComments")

  document.getElementById("commentInput").value = "";
}
/* -------------------------------- */

function calificar(item){
  sCount=item.id 
  //console.log(count)
  for (let i = 0; i < 5; i++) {
    if (i<sCount) {
      document.getElementById(i+1).style.color="#FFB122"
    }else{
      document.getElementById(i+1).style.color="black"
    }
  }
}
