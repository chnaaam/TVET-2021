import React from 'react';
import { withRouter } from 'react-router';
import IPlatOpenApiPageUI from "./iplat_open_api_page_ui";
import {checkUserSession} from "../../core/user";

class IPlatOpenApiPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            user: {id: "", token: ""}
        }
    }

    async componentDidMount() {
        // Check session
        const result = await checkUserSession()

        if(result.isSessionOk === false){
            this.props.history.push('/');
            return;
        }

        const userId = result.userId;
        const userToken = result.userToken;

        let userInfo = Object.assign({}, this.state.user)
        userInfo.id = userId
        userInfo.token = userToken

        await this.setState({user: userInfo})
    }

    render() {
        return(
            <IPlatOpenApiPageUI
                user={this.state.user}
            />
        )
    }
}

export default withRouter(IPlatOpenApiPage);
