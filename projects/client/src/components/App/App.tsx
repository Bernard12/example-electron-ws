import * as React from "react";
import { connect } from "react-redux";
import { ApplicationNetworkState, IApplicationState } from "../../redux/domain";
import ConnectComponent from "../Connect/ConnectComponent";
import MessageBoxComponent from "../MessageBox/MessageBoxComponent";

export interface IAppComponentProps {
    readonly isConnected: boolean;
}

class AppComponent extends React.PureComponent<IAppComponentProps, {}> {
    public componentDidUpdate(prevProps: Readonly<IAppComponentProps>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log(JSON.stringify(this.props));
    }

    public render() {
        return (
            <div className="container">
                {!this.props.isConnected && <ConnectComponent />}
                {this.props.isConnected && <MessageBoxComponent />}
            </div>
        );
    }
}

const mapStateToProps = (state: IApplicationState): IAppComponentProps => ({
    isConnected: state.isLoading === ApplicationNetworkState.CONNECTED
});

export default connect(
    mapStateToProps,
    null
)(AppComponent);
