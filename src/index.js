import express from 'express'
import http from 'http'

import { Server } from 'socket.io'

const app = express()

const server = http.createServer(app)

const io = new Server(server)  // directly attach server to websocket

const checkBox = new Array(1000).fill(false);


//const io = new Server()
// io.attach(server)  //manually attach server to websocket 

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.send('Server is running')
})


io.on('connection', (socket) => {
    console.log('connected to client * ', socket.id);
    io.emit('box-model', checkBox);

    socket.on('click', (data) => {
        checkBox[data.index] = data.value
        socket.broadcast.emit(checkBox);  //this send message to all clients except the sender
    });
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});
