export enum ApplicationNetworkState {
    NOT_CONNECTED,
    LOADING,
    CONNECTED
}

export interface IMessage {
    readonly time: number;
    readonly name: string;
    readonly message: string;
}

export interface IApplicationState {
    readonly isLoading: ApplicationNetworkState;
    readonly messages: IMessage[];
}
