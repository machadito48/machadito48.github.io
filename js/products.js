let productsArray = [];
let priceMin = document.getElementById("rangeFilterPriceMin");
let priceMax = document.getElementById("rangeFilterPriceMax");
let txtSearch = document.getElementById("filterSearchBar");

fetch(PRODUCTS_URL)
  .then((response) => response.json())
  .then((data) => {
    productsArray = data.products;
    showProductsList(productsArray);
  });

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function showProductsList(array) {
  let htmlContentToAppend = "";
  /* precio, nombre, descripción, cantidad vendidos e imagen */
  for (let i = 0; i < array.length; i++) {
    let products = array[i];
    htmlContentToAppend +=
      ` <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      products.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>` +
      products.name +
      " - " +
      products.currency +
      products.cost +
      `</h4> 
                            <p> ` +
      products.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      products.soldCount +
      ` Artículos vendidos </small> 
                    </div>
                </div>
            </div>
        </div> `;

    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function filtrar() {
  let filtersArray = productsArray;
  if (priceMin.value != "") {
    filtersArray = filtersArray.filter(
      (product) => product.cost >= priceMin.value
    );
  }

  if (priceMax.value != "") {
    filtersArray = filtersArray.filter(
      (product) => product.cost <= priceMax.value
    );
  }

  if (txtSearch.value != "") {
    filtersArray = filtersArray.filter(
      (product) =>
        product.name.toLowerCase().includes(txtSearch.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(txtSearch.value.toLowerCase())
    );
  }

  showProductsList(filtersArray);
}

function btnFiltrarAsc() {
  let sort = productsArray.sort((a, b) => {
    return a.cost - b.cost;
  });
  showProductsList(sort);
}
function btnFiltrarDesc() {
  let sort = productsArray.sort(function (a, b) {
    return b.cost - a.cost;
  });
  showProductsList(sort);
}
function btnFiltrarRel() {
  let sort = productsArray.sort((a, b) => {
    return b.soldCount - a.soldCount;
  });
  showProductsList(sort);
}

document
  .getElementById("rangeFilterPriceMin")
  .addEventListener("input", filtrar);
document
  .getElementById("rangeFilterPriceMax")
  .addEventListener("input", filtrar);
document.getElementById("filterSearchBar").addEventListener("input", filtrar);

document.getElementById("sortAsc").addEventListener("click", btnFiltrarAsc);
document.getElementById("sortDesc").addEventListener("click", btnFiltrarDesc);
document.getElementById("sortByCount").addEventListener("click", btnFiltrarRel);
