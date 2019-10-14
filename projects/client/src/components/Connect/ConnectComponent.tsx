import * as React from "react";
import { connect } from "react-redux";
import { IAppAction } from "../../redux/actions";

export interface IConnectProps {
    connect(): void;
}

class ConnectComponent extends React.PureComponent<IConnectProps, {}> {
    constructor(props: IConnectProps) {
        super(props);
    }

    public render() {
        return (
            <div className="d-flex justify-content-center connect" onClick={this.click}>
                <h1 className="display-1">Connect</h1>
            </div>
        );
    }

    private click = () => this.props.connect();
}

const mapDispatchToProps = (dispatch: (action: IAppAction) => void): IConnectProps => ({
    connect: () => dispatch({ type: "Connect" })
});

export default connect(
    null,
    mapDispatchToProps
)(ConnectComponent);
