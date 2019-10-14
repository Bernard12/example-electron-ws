import Axios from "axios";

const axios = createAxiosInstance();
let ws: WebSocket;

function createAxiosInstance() {
    const ax = Axios.create({});
    ax.defaults.withCredentials = true;
    return ax;
}

export async function connect() {
    try {
        await axios.get("http://localhost:8888/login");
        return true;
    } catch (err) {
        console.log(JSON.stringify(err));
        return false;
    }
}

export async function createSocket() {
    return new Promise((res, rej) => {
        ws = new WebSocket("ws://localhost:8888");
        ws.onopen = () => {
            console.log(`Websocket is open`);
            res(ws);
        };
        ws.onclose = () => console.log(`Websocket is open`);
    });
}

export async function sendMessage(msg: string): Promise<void> {
    try {
        ws.send(msg);
    } catch (err) {
        console.log(err);
    }
}
