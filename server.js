const express= require("express");
const {Server: IOServer} = require("socket.io")
const {Server: HttpServer} = require("http")

const app = express()
const httpServer =  new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"))

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];
const productos = []

io.on('connection', (socket) => {    
    
    socket.emit('messages', messages) 

    socket.emit('productos', productos) 

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
    socket.on('new-producto', data => {
        productos.push(data);
        io.sockets.emit('productos', productos);
    })
})

//
const handlebars = require("express-handlebars");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "tabla.hbs",
    layoutsDir: __dirname + "/views",
  })
);
app.set("view engine", "hbs"); // registra el motor de plantillas
app.set("views", "./views"); // especifica el directorio de vistas



// El servidor funcionando en el puerto 3000
httpServer.listen(8080, () => console.log('SERVER ON PORT 8080'))