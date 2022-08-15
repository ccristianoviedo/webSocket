const express = require('express');
const app = express();
const router = require('./routes/routes')
const {Server: IOServer} = require("socket.io")
const {Server: HttpServer} = require("http")

const httpServer =  new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');
app.use("/",router)

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

io.on('connection', (socket) => {    
    console.log('Un cliente se ha conectado')     
    socket.emit('messages', messages) 

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})
  

httpServer.listen(8080, () => console.log('Servidor funcionando'))