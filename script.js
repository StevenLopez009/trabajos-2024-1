import { Datas } from "./datas.js";

const d = document;
const $contentImgs = d.querySelector(".content_imagenes")
let $panel = d.querySelector(".panel")
let $formCreate =d.querySelector(".formCreate")



document.addEventListener("DOMContentLoaded", async (e) => {
  
  try {
    const response = await fetch(`http://localhost:1337/api/fotos`);
    const data = await response.json();
    const arregloP = data.data;
    // console.log(arregloP);

    arregloP.forEach((element) => {
      let image = element.attributes.foto_principal;
      let nombre = element.attributes.nombre;
      let imageSecundary = element.attributes.foto_secundaria;
      let id = element.id;

      const target = `
        <article class="swiper-slide">
          <div class="img_box">
            <img src="${image}" class="imagen_dinamica_casa" data-id="${id}">
            <div class="content_name">
              <p>${nombre}</p>
            </div>
          </div>
        </article>
      `;
      const carrucel = document.querySelector(".swiper-wrapper")
      carrucel.innerHTML += target;
    });

    arregloP.forEach((element) => {
      let nombre = element.attributes.nombre;

      const target = `
        <table class="table-items">
          <tr>
              <td>items</td>
              <td>Edit</td>
              <td>Delete</td>
          </tr>
          <tr>
              <td>${nombre}</td>
              <td><button class="btn-editar">Edit</button></td>
              <td><button class="btn-eliminar">Delete</button></td>
          </tr>
        </table>
      `;
      document.querySelector(".tabla-crud").innerHTML += target;
    });
  } catch (error) {
    console.error(error);
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".imagen_dinamica_casa")) {
    const btnId = e.target.dataset.id;

    try {
      const response = await fetch(`http://localhost:1337/api/fotos/${btnId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      $contentImgs.innerHTML = Datas(json);
    } catch (error) {
      console.error(error);
    }
  }

  if(e.target.matches(".registrarse")){
    $panel.classList.toggle("is-active")
  }
  

});





