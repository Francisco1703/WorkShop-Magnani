/** Apple Store **/

class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

//PRODUCTOS EN STOCK

const iphone14Pro = new Producto(
  1,
  "Iphone 14 Pro",
  999,
  "img/iphone14Pro.png"
);
const iphone14ProMax = new Producto(
  2,
  "Iphone 14 Pro Max",
  1099,
  "img/iphone14promax.png"
);
const iphone14 = new Producto(3, "Iphone 14", 799, "img/iphone14.png");
const iphone14Plus = new Producto(
  4,
  "Iphone 14 Plus",
  899,
  "img/iphone14plus.png"
);
const iphone13 = new Producto(5, "Iphone 13", 699, "img/iphone13.png");
const iphone13Mini = new Producto(6, "Iphone 13 Mini", 599, "img/iphone13.png");
const iphoneSE = new Producto(7, "Iphone SE", 429, "img/iphoneSE.png");
const iphone12 = new Producto(8, "Iphone 12", 599, "img/iphone12.png");

const productos = [
  iphone14Pro,
  iphone14ProMax,
  iphone14,
  iphone14Plus,
  iphone13,
  iphone13Mini,
  iphoneSE,
  iphone12,
];

let carrito = [];

//CARGA DEL CARRITO DESDE EL LOCAL STORAGE:

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(productos);

//API de criptoYa:

const criptoYa = "https://criptoya.com/api/dolar";

const dolar = document.getElementById("dolar");

let dolarBlue;

setInterval(() => {
  fetch(criptoYa)
    .then((response) => response.json())
    .then(({ oficial, solidario, mep, ccl, ccb, blue }) => {
      dolar.innerHTML = `
                <p class="fw-bold">Dolar OFICIAL: $${oficial} - Dolar SOLIDARIO $${solidario} - Dolar MEP $${mep} - Dolar CCL $${ccl} - Dolar CCB $${ccb} - Dolar BLUE $${blue}</p>
                `;
      dolarBlue = blue;
    });
}, 2000);

//Muestro los productos en la pantalla cambiando el DOM:

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-sm-12", "col-md-6", "col-xl-4");
    card.innerHTML = `<div class="mt-3 mb-3 card text-center d-flex justify-content-between align-items-center mx-4"> 
                        <img  src=" ${producto.img}" class="img-fluid card-img-tom imgProductos py-3">
                        <div class="card-body">
                          <h2 class="text-center styleName"> ${producto.nombre} </h2>
                          <p class="text-center styleNumber"> $${producto.precio} </p>
                          <button class="text-center btn btnCard py-2 px-4 rounded-pill" id="boton${producto.id}"> Agregar al carrito </button>  
                        </div>
                      </div>`;

    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    boton.addEventListener("click", () => {
      Toastify({
        text: "Se agregó el producto al carrito",
        duration: 3000,
        position: "right",
        gravity: "top",
        style: {
          background: "#2ECC71",
        },
      }).showToast();
    });
  });
};

mostrarProductos();

//Funcion para agregar los productos al carrito:

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push(producto);
  }

  console.log(carrito);
  calcularTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Muestro el carrito:

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-sm-12", "col-md-6", "col-xl-4");
    card.innerHTML = `
                  <div class="card d-flex justify-content-center align-items-center text-center my-3 mx-3">
                    <img src="${producto.img}" class="img-fluid card-img-tom imgProductos">
                    <div class="card-body">
                      <h2 class="text-center styleName"> ${producto.nombre} </h2>
                      <p class="text-center styleNumber"> $${producto.precio} </p>
                      <p class="text-center styleNumber"> ${producto.cantidad}</p>
                      <button class="btn rounded-pill  py-2 px-4 btnColor" id="eliminar${producto.id}"> Eliminar </button> 
                    </div>
                  </div>`;

    contenedorCarrito.appendChild(card);

    const botonEliminar = document.getElementById(`eliminar${producto.id}`);
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

//Eliminar el producto del carrito:

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Vaciar todo el carrito de compras:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  eliminarTodoDelCarrito();
});

const eliminarTodoDelCarrito = () => {
  carrito = [];
  mostrarCarrito();

  localStorage.clear();
};

//Mostrar el total de la compra:

const total = document.getElementById("totalCarrito");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `Total: $${totalCompra}`;
};

//Botón para finalizar la compra:

const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

btnFinalizarCompra.addEventListener("click", () => {
  if (carrito == 0) {
    Toastify({
      text: "¡Error! No hay productos en el carrito.",
      style: {
        background: "red",
      },
    }).showToast();
  } else {
    Toastify({
      text: "¡La compra fue exitosa!",
      duration: 3000,
      position: "right",
      gravity: "top",
      style: {
        background: "#28b463",
      },
    }).showToast();
    Toastify({
      text: `El precio del dolar BLUE es $ ${dolarBlue}`,
      duration: "5000",
      position: "right",
      gravity: "top",
      style: {
        background: "#abebc6 ",
        color: "black",
      },
    }).showToast();

    Swal.fire({
      html: `
        <h2 class="fs-4 pb-4"> Ingrese sus datos para enviarle la boleta:</h2>
        <input class="my-2" type="text" id="nombre datos" placeholder="Nombre"  /> <br/>
        <input class="my-2" type="text" id="apellido datos" placeholder="Apellido"  /> <br/>
        <input class="my-2" type="email" id="email datos" placeholder="Email"  />
        `,
      background: "#dc7633",
      confirmButtonText: "Enviar",
      confirmButtonColor: "#f8c471",
      backdrop: "#edbb99",
      footer: `El precio del dolar BLUE es $ ${dolarBlue}`,
      width: `50%`,
      color: "black",
      allowOutsideClick: false,
      timer: 60000,
      timerProgressBar: true,
    });
  }

  finalizarCompra();
});

const finalizarCompra = () => {
  carrito = [];
  mostrarCarrito();
  localStorage.clear();
  console.log(carrito);
};
