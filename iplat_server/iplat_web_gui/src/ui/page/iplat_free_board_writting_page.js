import React from 'react';
import {withRouter} from "react-router";

import {registerFreeBoardContent} from "../../core/net/free_board";
import IPlatFreeBoardWrittingPageUI from "./iplat_free_board_writting_page_ui";

class IPlatFreeBoardWrittingPage extends React.Component{
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

    async registerFreeBoard(){
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

        const result = await registerFreeBoardContent(userId, userToken, title, content, fileList).then(
            function(e){
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
        // netTestFileUpload(e);
        /*
        FORMAT
        FileList {0: File, length: 1}
            0: File
            lastModified: 1603977553152
            lastModifiedDate: Thu Oct 29 2020 22:19:13 GMT+0900 (대한민국 표준시) {}
            name: "2020102922183655.csv"
            size: 220
            type: "application/vnd.ms-excel"
            webkitRelativePath: ""
            length: 1
         */
        console.log(fileList);
        this.setState({FILE_LIST: fileList});
    }

    render() {
        return (
            <IPlatFreeBoardWrittingPageUI
                // State
                IS_SESSION_OK={this.state.IS_SESSION_OK}
                USER_ID={this.state.USER_ID}

                // Handler
                // clickLogout={this.clickLogout.bind(this)}

                handleChangeTitleField={this.handleChangeTitleField.bind(this)}
                handleChangeContentField={this.handleChangeContentField.bind(this)}

                registerFreeBoard={this.registerFreeBoard.bind(this)}

                onChangeUploadFileList={this.onChangeUploadFileList.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatFreeBoardWrittingPage);
