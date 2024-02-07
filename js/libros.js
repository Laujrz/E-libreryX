const contenedorProducto = document.getElementById("resultados");
const verCarrito = document.getElementById("carrito");
const verGuardar = document.getElementById("guardar");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let libros = []; // Se utiliza esta variable para almacenar los libros 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let guarda = JSON.parse(localStorage.getItem("guarda")) || [];

// Esta función carga los libros desde el json
async function cargarLibros() {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    libros = data;
    libros.forEach((libro) => {
      libro.cantidad = 1;
    });
    mostrarLibros(libros); 
  } catch (error) {
    console.error("Error al cargar los libros:", error);
  }
}

// Muestra los libros en el contenedor
function mostrarLibros(librosMostrar) {
  contenedorProducto.innerHTML = "";
  librosMostrar.forEach((item) => {
    let div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.Nombre}"/>
      <h2>${item.Nombre}</h2>
      <h3>Categoria: ${item.categoria}</h3>
      <b class="price">Precio: ${item.precio}</b>        
    `;
      
    contenedorProducto.append(div);
      
    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";
      
    div.append(comprar);
     
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatItem) => repeatItem.id === item.Id);
      if (repeat){
        carrito.map((prod) => {
          if(prod.id === item.Id){
            prod.cantidad++;
          }
      });
    }else {
      carrito.push({
        id: item.Id,
        imagen: item.imagen,
        nombre: item.Nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      });
      
    };
    agregarLibro();
    carritoCounter();
    saveLocal();
    });
    
    

    let guardar = document.createElement("button");
    guardar.innerText = "Guardar";
    guardar.className = "Guardar";
      
    div.append(guardar);
      
    guardar.addEventListener("click", () => {
      guarda.push({
        id: item.id,
        imagen: item.imagen,
        nombre: item.Nombre,
        precio: item.precio,
      });
      guardarLibro();
      guardaContent();
      saveLocalGuardado();
    });
  });
}
const saveLocal = () => {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    };
const saveLocalGuardado = () => {
  localStorage.setItem("guarda", JSON.stringify(guarda));
};
    

// Función para mostrar mensaje de libro agregado al carrito
function agregarLibro() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Libro agregado al carrito",
    showConfirmButton: false,
    timer: 1500
  });
}

// Función para mostrar mensaje de libro guardado
function guardarLibro() {
  Toastify({
    text: "Libro guardado",
    duration: 2000
  }).showToast();
}

cargarLibros();


// Este escuchador permite buscar libros en el buscador y al borrar te lleva al inicio nuevamente

let buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {
  contenedorProducto.scrollIntoView({ behavior: "smooth" });
  
  buscador.value.trim() === "" ?  window.scrollTo({ top: 0, behavior: "smooth" }): null;
  const textoBusqueda = buscador.value.toLowerCase();

  const librosFiltrados = libros.filter((item) =>
    item.Nombre.toLowerCase().includes(textoBusqueda)
  );

  mostrarLibros(librosFiltrados);
 
   
});

// Este es el carrito donde se puede ver los libros para comprar

verCarrito.addEventListener("click", () => {
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
    `;

    modalContainer.append(carritoContent);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);

  const totalBuying = document.createElement("div")
  totalBuying.className = "total-content"
  totalBuying.innerHTML = `Total a pagar: $${total}`;
  modalContainer.append(totalBuying);
});

