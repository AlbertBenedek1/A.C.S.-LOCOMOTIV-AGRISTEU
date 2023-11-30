/*
  Product

  Create
  Read
  Update
  Delete

  CRUD

*/

var state = {
    products: [
      {
        id: uuidv4(),
        name: "Teszt termék 1",
        price: 2500,
        isInStock: true
      },
      {
        id: uuidv4(),
        name: "Teszt termék 2",
        price: 3500,
        isInStock: false
      },
      {
        id: uuidv4(),
        name: "Teszt termék 3",
        price: 5500,
        isInStock: true
      }
    ]
  };

  function renderProducts(){
    var productsHTML = "Szia";

    /*for (var product of state.products){
        productsHTML += `
        <div class="card">
            <p>${product.name}</p>
            <p>${product.price}</p>
        </div>
        `;
    }*/
    document.getElementById("product-list-component").innerHTML = productsHTML;
  }
  window.onload = renderProducts;   
  