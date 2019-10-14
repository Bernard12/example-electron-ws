const express = require("express");
const session = require("express-session");
const http = require("http");
const uuid = require("uuid");
const WebSocket = require("ws");
const cors = require("cors");
const shortId = require("shortid");

const app = express();

const sessionParser = session({
    saveUninitialized: false,
    secret: '$test',
    resave: false
});

app.use(sessionParser);
app.use(cors({
    origin: ["http://localhost:8080"],
    credentials: true
}));
app.get('/', (req, res) => {
    console.log(`Get req from ${req.session.id}!`);
    res.send({id: req.session.id});
});

app.get('/login', (req, res) => {
    const id = uuid.v4();

    console.log(`Updating session for user ${id}`);
    req.session.userId = id;
    res.send({result: 'OK', message: 'Session updated'});
});

app.get('/logout', function (req, res) {
    console.log('Destroying session');
    req.session.destroy(() => {
        res.send({result: 'OK', message: 'Session destroyed'});
    });
});

const server = http.createServer(app);
const socketServer = new WebSocket.Server({noServer: true});
const mapping = new Map();

server.on('upgrade', function (request, socket, head) {
    console.log('Parsing session from request...');

    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            console.log(`Received upgrade request without userId, login before`);
            socket.destroy();
            return;
        }

        mapping.set(request.session.userId, `user-${shortId.generate()}`);
        console.log('Session is parsed!');
        socketServer.handleUpgrade(request, socket, head, function (ws) {
            socketServer.emit('connection', ws, request);
        });
    });
});

/**
 * @param message String
 */
function buildResponse(message, name) {
    return ({message: message, timestamp: new Date().getTime(), name: name});
}

socketServer.on('connection', function (socket, request) {
    console.log(`Handle ws connection`);
    socket.on("message", function (message) {
        console.log(
            `Received message ${message} from user ${request.session.userId}`
        );
        socketServer.clients.forEach(client => client.send(JSON.stringify(buildResponse(message, mapping.get(request.session.userId)))));
    });
});


server.listen(8888, () => {
    console.log(`Listen on http://localhost:8888`);
});
