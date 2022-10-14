const URL = CART_INFO_URL + "25801.json"
const jsonData = await fetch(URL).then((response) => response.json());//requiere => type="module"



let toHTML = "";

toHTML += `
    <div class="col-2"><img class="cartImg" src="${jsonData.articles[0].image}" alt=""></div>
    <span class="col-2">${jsonData.articles[0].name}</span>
    <span class="col-2">U$D ${jsonData.articles[0].unitCost}</span>
    <div class="col-2"><input class="w-50" type="number" min="1" id="cantidad" value="${jsonData.articles[0].count}"></div>
    <span id="subtotal" class="col-2 fw-bold">U$D ${jsonData.articles[0].count * jsonData.articles[0].unitCost}</span>
`

document.getElementById("prodCarrito").innerHTML = toHTML;



document.getElementById("cantidad").addEventListener("change",()=>{
    let toHTML ="";toHTML += `U$D ${document.getElementById("cantidad").value * jsonData.articles[0].unitCost}`
    document.getElementById("subtotal").innerHTML = toHTML;
})



