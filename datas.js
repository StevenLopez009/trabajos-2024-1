export function Datas(props){
    let {data}=props
    console.log(props)
    return `<div class="divImg">
                <img class="imagen1" src="${data.attributes.foto_secundaria}" >
                <img class="imagen2" src="${data.attributes.foto_terciaria}" >
                <img class="imagen3" src="${data.attributes.foto_cuarta}" >
            </div>     
            <div class="content_infocasa">
                <h2>${data.attributes.nombre}</h2>
                <p>${data.attributes.descripcion}</p>
                <div class="propiedades_casa">
                    <p>Cuartos: ${data.attributes.cuartos}</p>
                    <p>Baños: ${data.attributes.sanitarios}</p>
                    <p>Precio: ${data.attributes.precio}</p>
                </div>
            </div>`
}