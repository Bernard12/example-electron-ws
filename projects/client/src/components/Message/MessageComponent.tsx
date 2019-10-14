import * as React from "react";
import { connect } from "react-redux";
import { IMessage } from "../../redux/domain";

export interface IMessageProps {
    readonly message: IMessage;
}

class MessageComponent extends React.PureComponent<IMessageProps, {}> {
    public render() {
        const message = this.props.message;
        return (
            <div className="chat-message">
                <h5>{`[${this.formatTimestamp(message.time)}](${message.name}): ${message.message}`}</h5>
            </div>
        );
    }

    private formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    };

}

export default connect(
    null,
    null
)(MessageComponent);
