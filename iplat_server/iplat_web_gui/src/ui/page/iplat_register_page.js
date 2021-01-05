import React from 'react';
import { withRouter } from 'react-router';
import crypto from "crypto";

import {netSalt, netUserRegister} from "../../core/net/user";

import {CODE} from "../../core/net/err_code";

import IPlatRegisterPageUI from "./iplat_register_page_ui";

class IPlatRegisterPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            "USER_ID" : "",
            "USER_EMAIL" : "",
            "USER_PW" : "",
            "USER_CONFIRM_PW" : "",
            "IS_WARNING_MSG_SHOW" : false,
            "WARNING_MSG" : "",
        }
    }

    handleChangeIdField(e){ this.setState({"USER_ID": e.target.value})  }
    handleChangeEmailField(e){ this.setState({"USER_EMAIL": e.target.value})  }
    handleChangePwField(e){ this.setState({"USER_PW": e.target.value})  }
    handleChangeConfirmPwField(e){ this.setState({"USER_CONFIRM_PW": e.target.value})  }

    async clickRegister(){
        let is_warning_msg_show = false
        let warning_msg = ""

        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        if(this.state.USER_ID === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert account ID"
        }

        else if(this.state.USER_EMAIL === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert account email"
        }

        else if(!emailRegex.test(this.state.USER_EMAIL))
        {
            is_warning_msg_show = true
            warning_msg = "Email format is incorrect"
        }

        else if(this.state.USER_PW === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert account password"
        }

        else if(this.state.USER_CONFIRM_PW === "")
        {
            is_warning_msg_show = true
            warning_msg = "Please insert confirm password"
        }

        else if(this.state.USER_PW !== this.state.USER_CONFIRM_PW)
        {
            is_warning_msg_show = true
            // warning_msg = "Not correct password and confirm password"

            // 교수님이 문장 변경
            warning_msg = "You account was not found"
        }

        if(is_warning_msg_show === true)
        {
            this.setState({
                "IS_WARNING_MSG_SHOW" : is_warning_msg_show,
                "WARNING_MSG" : warning_msg
            })

            return;
        }

        // Crypto
        const password = this.state.USER_PW;
        const crypto = require('crypto');
        const salt = await netSalt();

        const hash_pw = crypto.createHmac('sha256', salt)
            .update(password)	// 암호화할 값
            .digest('base64');	// 인코딩방식

        const result = await netUserRegister(
            this.state.USER_ID,
            this.state.USER_EMAIL,
            hash_pw
        );

        if(result["status"] === true)
        {
            // Link to Introduction page
            this.props.history.push('/')

            // 출력창 띄우지 말고 바로 넘어가기
            alert("Your account was successfully registered")

            return;
        }
        else
        {
            switch(result["CODE"])
            {
                case CODE.ALREADY_USER_IS_EXISTED:
                    is_warning_msg_show = true
                    warning_msg = "Already account is existed"
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

    render() {
        return (
            <IPlatRegisterPageUI
                // State
                IS_WARNING_MSG_SHOW={this.state.IS_WARNING_MSG_SHOW}
                WARNING_MSG={this.state.WARNING_MSG}

                // Handler
                handleChangeIdField={this.handleChangeIdField.bind(this)}
                handleChangeEmailField={this.handleChangeEmailField.bind(this)}
                handleChangePwField={this.handleChangePwField.bind(this)}
                handleChangeConfirmPwField={this.handleChangeConfirmPwField.bind(this)}
                clickRegister={this.clickRegister.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatRegisterPage);
