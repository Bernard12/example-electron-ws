import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState, IMessage } from "../../redux/domain";
import MessageComponent from "../Message/MessageComponent";
import MessageInputComponent from "../MessageInput/MessageInputComponent";

export interface IMessageBoxComponentProps {
    readonly messages: IMessage[];
}

class MessageBoxComponent extends React.PureComponent<IMessageBoxComponentProps, {}> {
    public render() {
        return (
            <div>
                <div className="chat-box">
                    {this.props.messages.map(message => (
                        <MessageComponent message={message} key={`${message.name}/${message.time}`} />
                    ))}
                </div>
                <MessageInputComponent />
            </div>
        );
    }
}

const mapStateToProps = (state: IApplicationState): IMessageBoxComponentProps => ({
    messages: state.messages
});

export default connect(
    mapStateToProps,
    null
)(MessageBoxComponent);
