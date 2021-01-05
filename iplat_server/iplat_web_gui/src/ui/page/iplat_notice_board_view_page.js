import React from 'react';
import {withRouter} from "react-router";

import {netFileDownload} from "../../core/net/free_board";
import IPlatNoticeBoardViewPageUI from "./iplat_notice_board_view_page_ui";
import {netNoticeBoardContent, netNoticeBoardDel, netNoticeBoardFileDownload} from "../../core/net/notice_board";

class IPlatNoticeBoardViewPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            IS_SESSION_OK: true,
            USER_ID: "",
            USER_TOKEN: "",

            TITLE: "",
            CONTENT:"",

            no: props.component.match.params.no,
            isManager: 0,
        };
    }

    async componentDidMount() {
        var userId = window.sessionStorage.getItem('USER_ID')
        var userToken = window.sessionStorage.getItem('USER_TOKEN')
        var isManager = window.sessionStorage.getItem('IS_MANAGER')

        this.setState({
            USER_ID: userId,
            USER_TOKEN: userToken,
        });

        const result = await netNoticeBoardContent(this.state.no).then(function(e){
            return e;
        })

        if(result === null)
            return;

        const content = result['notice_board_content']

        this.setState({
            TITLE: content.title,
            CONTENT: content.content,
            FILE_LIST: content.uploaded_file ? content.uploaded_file.split(', ') : [],
        })

        if(isManager == 1){
            this.setState({isWriterOK: true})
        }
    }

    async OnClickDownloadFile(e){
        await netNoticeBoardFileDownload(e);
    }

    async OnClickDel(){
        const result = await netNoticeBoardDel(this.state.no).then(function(e){
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
            <IPlatNoticeBoardViewPageUI
                USER_ID={this.state.USER_ID}
                isWriterOK={this.state.isWriterOK}
                TITLE={this.state.TITLE}
                CONTENT={this.state.CONTENT}
                FILE_LIST={this.state.FILE_LIST}

                OnClickDownloadFile={this.OnClickDownloadFile.bind(this)}
                OnClickDel={this.OnClickDel.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatNoticeBoardViewPage);
