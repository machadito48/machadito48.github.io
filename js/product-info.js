let prodData = [];

fetch(PRODUCT_INFO_URL)
  .then((response) => response.json())
  .then((data) => {
    prodData = data;
    mostrarProd(prodData);
  });
function mostrarImg() {
  let toImgList = "";
  for (let i = 0; i < prodData.images.length; i++) {
    const element = prodData.images[i];
    console.log(element)
    toImgList += `
      <img src="${element}" class="img-thumbnail w-25">
    `;
    document.querySelector(".imgList").innerHTML = toImgList;
    /*  */
  }
}
function mostrarProd(array) {
  let toHTML = "";

  toHTML += `
    <div class="container">
      <h2 class="border-bottom py-5">${prodData.name}</h2>
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
    </div>
    `;

  document.querySelector(".prodContainer").innerHTML = toHTML;

  mostrarImg();
}
