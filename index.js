const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const server=http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
})
global.io = io


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("monoDB is connected"))
    .catch((err) => console.log(err))

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/authentication", require("./Router/AuthenticationRoute"));
app.use("/api/v1/conversation", require("./Router/ConversationRoute"));


global.io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('new_message', (message) => {
      console.log('Received message:', message);
      io.emit('new_message', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

app.get('/', (req, res) => {
    res.json('connected')
})
server.listen(process.env.PORT, () => console.log("server connected"));