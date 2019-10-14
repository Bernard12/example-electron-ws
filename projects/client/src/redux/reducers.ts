import {IAppAction, IConnectionResult, IReceivedMessageAction} from "./actions";
import { ApplicationNetworkState, IApplicationState } from "./domain";

export const rootReducer = (state: IApplicationState, event: IAppAction) => {
    switch (event.type) {
        case "ConnectResult":
            state = connectionStatusReducer(state, event);
            break;
        case "ReceivedMessage":
            state = receivedMessageReducer(state, event);
            break;
    }
    return state;
};

const connectionStatusReducer = (state: IApplicationState, action: IConnectionResult): IApplicationState => {
    return action.success
        ? { ...state, isLoading: ApplicationNetworkState.CONNECTED }
        : { ...state, isLoading: ApplicationNetworkState.NOT_CONNECTED };
};

const  receivedMessageReducer = (state: IApplicationState, action: IReceivedMessageAction): IApplicationState => {
    state = {...state, messages: [...state.messages, action]};
    return state;
};
