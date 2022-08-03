const socket = io()

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}
function addProductos(e) {
    const productos = {
        producto: document.getElementById('producto').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value
    };
    socket.emit('new-producto', productos);
    return false;
}
socket.on("productos",(productos)=>{
   htmlTable(productos).then((html)=>{
    document.getElementById("productos").innerHTML=html
   })
})

function htmlTable(productos) {
    return fetch("views/tabla.hbs")
    .then((respuesta)=>respuesta.text())
    .then((plantilla)=>{
        const template = Handlebars.compile(plantilla)
        const html = template({productos})
        return html
    })
}





