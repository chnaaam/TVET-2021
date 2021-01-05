import React, {createContext} from 'react';
import {withRouter} from "react-router";
import IPlatLoginPageUI from "./iplat_login_page_ui";

import {netSalt, netUserLogin} from "../../core/net/user";
import {CODE} from "../../core/net/err_code";
import crypto from "crypto";

class IPlatLoginPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            "USER_ID" : "",
            "USER_PW" : "",
            "IS_WARNING_MSG_SHOW" : false,
            "WARNING_MSG" : "",
        }
    }

    componentDidMount() {
        window.sessionStorage.setItem("USER_ID", "")
        window.sessionStorage.setItem("USER_TOKEN", "")
        window.sessionStorage.setItem("IS_MANAGER", 0)


    }

    handleChangeIdField(e){ this.setState({"USER_ID": e.target.value})  }
    handleChangePwField(e){ this.setState({"USER_PW": e.target.value})  }

    async clickLogin(){
        let is_warning_msg_show = false
        let warning_msg = ""

        if(this.state.USER_ID === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert account ID"
        }

        else if(this.state.USER_PW === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert account password"
        }

        if(is_warning_msg_show === true)
        {
            this.setState({
                "IS_WARNING_MSG_SHOW" : is_warning_msg_show,
                "WARNING_MSG" : warning_msg
            })

            return;
        }

        const password = this.state.USER_PW;
        const crypto = require('crypto');
        const salt = await netSalt();

        const hash_pw = crypto.createHmac('sha256', salt)
            .update(password)	// 암호화할 값
            .digest('base64');	// 인코딩방식

        const result = await netUserLogin(
            this.state.USER_ID,
            hash_pw
        );

        if(result["status"] === true)
        {
            window.sessionStorage.clear()

            window.sessionStorage.setItem("USER_ID", this.state.USER_ID)
            window.sessionStorage.setItem("USER_TOKEN", result['user_token'])
            window.sessionStorage.setItem("IS_MANAGER", result['is_manager'])

            // For Testing
            // console.log("Result : ", result, result['USER_TOKEN'], window.sessionStorage.getItem('USER_TOKEN'))
            // var userId = window.sessionStorage.getItem('USER_ID')
            // var userToken = window.sessionStorage.getItem('USER_TOKEN')
            // console.log(userId, userToken)

            // Link to Introduction page
            this.props.history.push('/home');
            return;
        }
        else
        {
            switch(result["CODE"])
            {
                case CODE.LOGIN_NOT_EXISTED:
                    is_warning_msg_show = true
                    warning_msg = "Account isn't exist"
                    break;
                case CODE.LOGIN_NOT_MATCH:
                    is_warning_msg_show = true
                    warning_msg = "The account ID or Password does not match"
                    break;
                default:
                    break;
            }

            this.setState({
                "IS_WARNING_MSG_SHOW" : is_warning_msg_show,
                "WARNING_MSG" : warning_msg
            })

            return;
        }
    }

    clickRegister(){ this.props.history.push('/register');  }
    clickFindIdPw(){ this.props.history.push('/find_account');  }



    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            this.clickLogin();
        }
    }

    render() {
        return(
            <IPlatLoginPageUI
                // State
                IS_WARNING_MSG_SHOW={this.state.IS_WARNING_MSG_SHOW}
                WARNING_MSG={this.state.WARNING_MSG}

                // Handler
                handleChangeIdField={this.handleChangeIdField.bind(this)}
                handleChangePwField={this.handleChangePwField.bind(this)}
                clickLogin={this.clickLogin.bind(this)}
                clickRegister={this.clickRegister.bind(this)}
                clickFindIdPw={this.clickFindIdPw.bind(this)}
                handleKeyPress={this.handleKeyPress.bind(this)}
            />
        )
    }
}

export default withRouter(IPlatLoginPage);
