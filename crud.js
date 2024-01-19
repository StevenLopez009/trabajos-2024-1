const d = document;
let $formCreate = d.querySelector(".formCreate");

const $tabla = d.querySelector(".tabla");
let $inputName = d.querySelector(".input-name");
let $img1 = d.querySelector(".img1");
let $img2 = d.querySelector(".img2");
let $img3 = d.querySelector(".img3");
let $img4 = d.querySelector(".img4");
let $descripcion = d.querySelector(".descrip");
let $cuartos = d.querySelector(".cuartos");
let $baños = d.querySelector(".baños");
let $precio = d.querySelector(".precio");

let $inputHidden = d.querySelector(".inputHiden");
let $SaveEdit = d.querySelector(".btnSaveEdit");

d.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const response = await fetch(`http://localhost:1337/api/fotos`);
    const data = await response.json();
    console.log(data);
    const arregloP = data.data;
    console.log(arregloP);

    arregloP.forEach((element) => {
      let nombre = element.attributes.nombre;
      let img1 = element.attributes.foto_principal;
      let img2 = element.attributes.foto_secundaria;
      let img3 = element.attributes.foto_terciaria;
      let img4 = element.attributes.foto_cuarta;
      let description = element.attributes.descripcion;
      let cuartos = element.attributes.cuartos;
      let baños = element.attributes.sanitarios;
      let precio = element.attributes.precio;
      let id = element.id;

      // console.log(nombre)
      const target = `
            <tr>
                <td>${nombre}</td>
                <td><button class="btn-editar" data-id=${id} data-name=${nombre} data-img1=${img1} data-img2=${img2} data-img3=${img3} data-img4=${img4} data-description=${description} data-cuartos=${cuartos} data-baños=${baños} data-precio=${precio}>Edit</button></td>
                <td><button class="btn-eliminar" data-id=${id}>Delete</button></td>
            </tr>
        `;
      d.querySelector(".table-items").innerHTML += target;
    });
  } catch (error) {
    console.error(error);
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".btnCrear")) {
    e.preventDefault();
    // POST
    try {
      let data = {
        data: {
          nombre: $formCreate.nombre.value,
          foto_principal: $formCreate.imagen1.value,
          foto_secundaria: $formCreate.imagen2.value,
          foto_terciaria: $formCreate.imagen3.value,
          foto_cuarta: $formCreate.imagen4.value,
          descripcion: $formCreate.descripcion.value,
          cuartos: $formCreate.numeroCuartos.value,
          sanitarios: $formCreate.numeroBaños.value,
          precio: $formCreate.precio.value,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(`http://localhost:1337/api/fotos/`, options);
      const json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
    } catch (error) {
      let message = error.statusText || "Ocurrió un error";
      console.log(message);
    }

    location.reload();
  }

  if (e.target.matches(".btn-editar")) {
    $SaveEdit.id = e.target.dataset.id;
    $inputName.value = e.target.dataset.name;
    $img1.value = e.target.dataset.img1;
    $img2.value = e.target.dataset.img2;
    $img3.value = e.target.dataset.img3;
    $img4.value = e.target.dataset.img4;
    $descripcion.value = e.target.dataset.description;
    $cuartos.value = e.target.dataset.cuartos;
    $baños.value = e.target.dataset.baños;
    $precio.value = e.target.dataset.precio;
  }

  if (e.target.matches(".btnSaveEdit")) {
    e.preventDefault();

    const idHouse = e.target.id;

    let data = {
      data: {
        nombre: $formCreate.nombre.value,
        foto_principal: $formCreate.imagen1.value,
        foto_secundaria: $formCreate.imagen2.value,
        foto_terciaria: $formCreate.imagen3.value,
        foto_cuarta: $formCreate.imagen4.value,
        descripcion: $formCreate.descripcion.value,
        cuartos: $formCreate.numeroCuartos.value,
        sanitarios: $formCreate.numeroBaños.value,
        precio: $formCreate.precio.value,
      },
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(
        `http://localhost:1337/api/fotos/${idHouse}`,
        options
      );
      const json = await res.json();
      console.log(res, json);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
    } catch (error) {
      let message = error.statusText || "Ocurrió un error";
      console.log(message);
    } finally {
      location.reload();
    }
  }

  if (e.target.matches(".btn-eliminar")) {
    try {
      let options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
      };
      // Añadir "await" antes de "fetch" para esperar la respuesta del servidor
      let res = await fetch(
        `http://localhost:1337/api/fotos/${e.target.dataset.id}`,
        options
      );
      let json = await res.json();
    } catch (error) {
      // Capturar el error y manejarlo (por ejemplo, mostrar un mensaje de error)
      console.error("Error al eliminar la foto:", error);
    }
    // Mover "location.reload();" dentro del bloque "try" para recargar solo después de eliminar correctamente
    location.reload();
  }
});
