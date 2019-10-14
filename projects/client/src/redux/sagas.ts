import { eventChannel } from "redux-saga";
import { put, takeEvery, takeLatest, take } from "redux-saga/effects";
import { connect, createSocket, sendMessage } from "../logic/connection";
import {createConnectResultAction, createReceivedMessageAction, IMessageAction} from "./actions";

function createSocketChannel(socket: WebSocket) {
    return eventChannel(emitter => {
        socket.onmessage = message => {
            const data = JSON.parse(message.data);
            emitter(createReceivedMessageAction(data.message, data.name, data.timestamp));
        };
        return () => socket.close(0);
    });
}

function* connectionSaga() {
    const success = yield connect();
    yield put(createConnectResultAction(success));
    const socket = yield createSocket();
    const chan = createSocketChannel(socket);
    try {
        while (true) {
            const msg = yield take(chan);
            yield put(msg);
            console.log(`Received message from server: ${msg}`);
        }
    } finally {
        console.log(`Websocket stream finished`);
    }
}

function* sendMessageToServer(messageAction: IMessageAction) {
    yield sendMessage(messageAction.message);
}

export function* mySaga() {
    yield takeLatest("Connect", connectionSaga);
    yield takeEvery("Message", sendMessageToServer);
}
