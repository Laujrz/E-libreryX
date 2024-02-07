const pintarGuardado = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
      <h1 class="modal-header-tittle">Guardados.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () =>{
      modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    guarda.forEach((item, index) => {
      let guardaContent = document.createElement("div");
      guardaContent.className = "modal-content";
      guardaContent.innerHTML = `
        <img src="${item.imagen}">
        <h2>${item.nombre}</h2>
        <b>$${item.precio}</b>
        <span class="delete-product"> ✖️ </span>
      `;

      modalContainer.append(guardaContent);

      let eliminar = guardaContent.querySelector(".delete-product");

      eliminar.addEventListener("click", () =>{
        eliminarGuardado(index);
      })
    });
};

// Función para eliminar un libro guardado
const eliminarGuardado = (index) => {
  guarda.splice(index, 1); 
  pintarGuardado(); 
  saveLocal();
};


verGuardar.addEventListener("click", pintarGuardado);