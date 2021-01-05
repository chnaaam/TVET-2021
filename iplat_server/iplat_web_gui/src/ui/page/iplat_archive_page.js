import React from 'react';
import IPlatArchivePageUI from "./iplat_archive_page_ui";
import IPlatWorkspaceItem from "../component/dashboard_items/iplat_workspace_item";
import {netDeviceInformation, netDeviceList} from "../../core/net/device";
import {netSensorInformation, netSensorList} from "../../core/net/sensor";
import {netDataContents, netDataList} from "../../core/net/data";
import {netGetSession} from "../../core/net/session";
import {CODE} from "../../core/net/err_code";
import {checkUserSession} from "../../core/user";
import {netArchiveList} from "../../core/net/archive";
import {withRouter} from "react-router";

class IPlatArchivePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isSessionOk: true,

            currentArchiveIdx: 0,
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
        const isManager = result.isManager;

        await this.setState({
            USER_ID: userId,
            USER_TOKEN: userToken,
            isManager: isManager,
        });

        const currentArchiveIdx = this.state.currentArchiveIdx;

        await this.setArchiveList(currentArchiveIdx);
    }

    async setArchiveList(currentArchiveIdx){
        const result = await netArchiveList(currentArchiveIdx).then(function (e){
            return e;
        })

        console.log("Result : ", result);
        this.setState({ARCHIVE_LIST:result['archive_list']})
        this.setState({archiveNum:result['archive_list_length']})
    }

    OnClickArchivedItem(e){
        this.props.history.push('/archive_content/' + e)
    }

    render() {
        return(
            <IPlatArchivePageUI
                USER_ID={this.state.USER_ID}
                isManager={this.state.isManager}

                ArchiveList = {this.state.ARCHIVE_LIST}
                OnClickArchivedItem = {this.OnClickArchivedItem.bind(this)}

            />
        )
    }
}

export default withRouter(IPlatArchivePage);
