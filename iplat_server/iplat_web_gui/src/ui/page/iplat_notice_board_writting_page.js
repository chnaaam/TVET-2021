import React from 'react';
import {withRouter} from "react-router";
import IPlatNoticeBoardWrittingPageUI from "./iplat_notice_board_writting_page_ui";
import {registerNoticeBoardContent} from "../../core/net/notice_board";


class IPlatNoticeBoardWrittingPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            IS_SESSION_OK: true,
            USER_ID: "",
            USER_TOKEN: "",

            TITLE: "",
            CONTENT:"",
            FILE_LIST:[],
        };
    }

    async componentDidMount() {
        var userId = window.sessionStorage.getItem('USER_ID')
        var userToken = window.sessionStorage.getItem('USER_TOKEN')

        this.setState({
            USER_ID: userId,
            USER_TOKEN: userToken,
        });
    }

    handleChangeTitleField(e){ this.setState({TITLE: e.target.value})  }
    handleChangeContentField(e){ this.setState({CONTENT: e.target.value})  }

    async registerNoticeBoard(){
        const userId = this.state.USER_ID;
        const userToken = this.state.USER_TOKEN;
        const title = this.state.TITLE;
        const content = this.state.CONTENT;
        const fileList = this.state.FILE_LIST;

        if(title === "")
        {

            return;
        }

        if(content === "")
        {

            return;
        }

        const result = await registerNoticeBoardContent(userId, userToken, title, content, fileList).then(
            function(e){
                console.log(e)
                return e;
            }
        )

        if(result['status'] === true){
            alert("Success to register")
            this.props.history.push('/home');
        }
        else{
            alert("Failed to register")
        }
    }

    onChangeUploadFileList(e){
        const fileList = e.target.files;

        this.setState({FILE_LIST: fileList});
    }

    render() {
        return (
            <IPlatNoticeBoardWrittingPageUI
                USER_ID={this.state.USER_ID}

                handleChangeTitleField={this.handleChangeTitleField.bind(this)}
                handleChangeContentField={this.handleChangeContentField.bind(this)}

                registerNoticeBoard={this.registerNoticeBoard.bind(this)}

                onChangeUploadFileList={this.onChangeUploadFileList.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatNoticeBoardWrittingPage);
