export const createConnectAction = () => ({
    type: "Connect"
} as const);

export const createConnectResultAction = (success: boolean) => ({
    type: "ConnectResult",
    success
} as const);

export const createMessageAction = (message: string) => ({
    type: "Message",
    message
} as const);

export const createReceivedMessageAction = (message: string, name: string, time: number) => ({
    type: "ReceivedMessage",
    message, name, time
} as const);

export type IConnectAction = ReturnType<typeof createConnectAction>;
export type IConnectionResult = ReturnType<typeof  createConnectResultAction>;
export type IMessageAction = ReturnType<typeof createMessageAction>;
export type IReceivedMessageAction = ReturnType<typeof createReceivedMessageAction>;

export type IAppAction = IConnectAction | IConnectionResult | IMessageAction | IReceivedMessageAction;
