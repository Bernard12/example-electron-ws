import * as React from "react";
import { connect } from "react-redux";
import { IAppAction } from "../../redux/actions";

export interface IMessageInputProps {
    send(message: string): void;
}

export interface IMessageInputState {
    readonly currentInput: string;
}

class MessageInputComponent extends React.PureComponent<IMessageInputProps, IMessageInputState> {
    private ref: HTMLTextAreaElement;

    constructor(props: IMessageInputProps) {
        super(props);
        this.state = {
            currentInput: ""
        };
    }

    public render() {
        return (
            <div className="chat-input" onKeyPress={this.keyHandler}>
                <textarea ref={el => this.ref=el} placeholder="Write somthing..." onChange={this.changeHandler} maxLength={100}/>
            </div>
        );
    }

    private keyHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            this.props.send(this.state.currentInput);
            this.ref.value = "";
            event.preventDefault();
        }
    };

    private changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const message = e.target.value;
        this.setState(() => ({ currentInput: message }));
    };
}

const mapDispatchToProps = (dispatch: (action: IAppAction) => void): IMessageInputProps => ({
    send: message => dispatch({ type: "Message", message })
});
export default connect(
    null,
    mapDispatchToProps
)(MessageInputComponent);
