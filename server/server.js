import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
let lastValue = "currently not set"

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // This will allow requests from any origin. Adjust as necessary for your use case.
        methods: ["GET", "POST"]
    }
});

// Enable CORS for all routes
app.use(cors());
// Enable JSON in the body
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.status(200).send("Sample Server")
});

app.get('/broadcastLast', (req, res)=>{
    io.emit("last", lastValue);
})

// Handle a socket connection request from a web client
io.on('connection', (socket) => {
    console.log('a user connected');
    //lets the client know that we connected by sending back a connect message.
    socket.emit("connectionComplete")

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("call", (arg1)=>{
        console.log(`We recieved the message ${arg1}`);
        lastValue = arg1;
    })

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});