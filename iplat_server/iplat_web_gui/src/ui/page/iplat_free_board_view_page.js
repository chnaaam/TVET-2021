import React from 'react';
import {withRouter} from "react-router";

import {
    netFreeBoardContent,
    netFreeBoardDel, netFreeBoardFileDownload,
} from "../../core/net/free_board";
import IPlatFreeBoardViewPageUI from "./iplat_free_board_view_page_ui";

class IPlatFreeBoardViewPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            IS_SESSION_OK: true,
            USER_ID: "",
            USER_TOKEN: "",

            TITLE: "",
            CONTENT:"",
            FILE_LIST: [],
            no: props.component.match.params.no,
            WRITER_TOKEN: "",

            isWriterOK: false,
        };
    }

    async componentDidMount() {
        var userId = window.sessionStorage.getItem('USER_ID')
        var userToken = window.sessionStorage.getItem('USER_TOKEN')

        this.setState({
            USER_ID: userId,
            USER_TOKEN: userToken,
        });

        const result = await netFreeBoardContent(this.state.no).then(function(e){
            console.log("Free Board Content Result : ", e);
            return e;
        })

        if(result === null)
            return;

        const content = result['free_board_content']

        this.setState({
            TITLE: content.title,
            CONTENT: content.content,
            FILE_LIST: content.uploaded_file ? content.uploaded_file.split(', ') : [],
            WRITER_TOKEN: content.writer_token,
        })

        if(content.writer_token == userToken)
            this.setState({isWriterOK: true})
    }

    async OnClickDownloadFile(e){
        await netFreeBoardFileDownload(e);
    }

    async OnClickDel(){
        const result = await netFreeBoardDel(this.state.no).then(function(e){
            return e;
        })

        if(result === null)
            return;

        if(result['DELETE'] == true)
        {
            alert("Success to delete this contents");
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <IPlatFreeBoardViewPageUI
                // State
                IS_SESSION_OK={this.state.IS_SESSION_OK}
                USER_ID={this.state.USER_ID}

                TITLE={this.state.TITLE}
                CONTENT={this.state.CONTENT}
                FILE_LIST={this.state.FILE_LIST}
                isWriterOK={this.state.isWriterOK}

                OnClickDownloadFile={this.OnClickDownloadFile.bind(this)}
                OnClickDel={this.OnClickDel.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatFreeBoardViewPage);
