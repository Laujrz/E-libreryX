const pintarCarrito = () => {
   modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
      <h1 class="modal-header-tittle">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () =>{
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((item) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
        <img src="${item.imagen}">
        <h2>${item.nombre}</h2>
        <b>$${item.precio}</b>
        <span id="restar" class="restar"> ➖ </span>
        <p>Cantidad: ${item.cantidad}</p>
        <span id="sumar" class="sumar"> ➕ </span>
        <p>Total: ${item.cantidad * item.precio}</p>
        <span class="delete-product"> ✖️ </span>
      `;
  
      modalContainer.append(carritoContent);
      
      let restar = carritoContent.querySelector(".restar");

      restar.addEventListener("click", () => {
        item.cantidad !== 1 ? item.cantidad-- : null;
        saveLocal();
        pintarCarrito();
      });

      let sumar = carritoContent.querySelector(".sumar");

      sumar.addEventListener("click", () => {
       item.cantidad++;
       saveLocal(); 
       pintarCarrito();
      });

      let eliminar = carritoContent.querySelector(".delete-product");

      eliminar.addEventListener("click", () =>{
        eliminarProducto(item.id)
      })
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id); 

  carrito = carrito.filter((carritoId) =>{
    return carritoId !== foundId;
  });
  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () =>{
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();






