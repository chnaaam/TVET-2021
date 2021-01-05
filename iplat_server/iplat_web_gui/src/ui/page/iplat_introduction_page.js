import React from "react";
import { withRouter } from 'react-router';

import IPlatIntroductionPageUI from "./iplat_introduction_page_ui";

import { CODE } from "../../core/net/err_code";
import {netUserLogout, netUserName} from "../../core/net/user";
import { netGetSession } from "../../core/net/session";
import {netFreeBoardList} from "../../core/net/free_board";
import {netNoticeBoardList} from "../../core/net/notice_board";
import {netDeviceNum} from "../../core/net/device";
import {netSensorNum} from "../../core/net/sensor";
import {checkUserSession} from "../../core/user";

class IPlatIntroductionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {id:"", token:""},
            isSessionOk: true,

            USER_ID: "",
            USER_TOKEN: "",
            isManager: false,

            UserName: "",
            DeviceNumber: 0,
            SensorNumber: 0,

            selectedNoticeBoardItemId: 0,

            selectedFreeBoardItemId: 0,

            noticeBoardNum: 0,
            freeBoardNum: 0,

            currentNoticeBoardIdx: 0,
            currentFreeBoardIdx: 0,
        };
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

        // Initialize introduction page
        const currentNoticeBoardIdx = this.state.currentNoticeBoardIdx;
        const currentFreeBoardIdx = this.state.currentFreeBoardIdx;

        await this.setUserName();
        await this.setDeviceNum();
        await this.setSensorNum();

        await this.setNoticeBoardList(currentNoticeBoardIdx);
        await this.setFreeBoardList(currentFreeBoardIdx);
    }

    async setNoticeBoardList(currentNoticeBoardIdx){
        const result = await netNoticeBoardList(currentNoticeBoardIdx).then(function (e){
            return e;
        })


        this.setState({NOTICE_BOARD_LIST:result['notice_board_list']})
        this.setState({noticeBoardNum:result['notice_board_list_length']})
    }

    async setFreeBoardList(currentFreeBoardIdx){
        const result = await netFreeBoardList(currentFreeBoardIdx).then(function (e){
            return e;
        })

        this.setState({FREE_BOARD_LIST:result['free_board_list']})
        this.setState({freeBoardNum:result['free_board_list_length']})
    }

    async setUserName(){
        this.setState({UserName : this.state.USER_ID})
    }

    async setDeviceNum(){
        const userToken = this.state.USER_TOKEN
        const result = await netDeviceNum(userToken).then(function (e){
            return e;
        })

        if(result['STATUS'] === false)
            return;

        this.setState({DeviceNumber : result['num']})
    }

    async setSensorNum(){
        const userToken = this.state.USER_TOKEN
        const result = await netSensorNum(userToken).then(function (e){
            return e;
        })

        if(result['STATUS'] === false)
            return;

        this.setState({SensorNumber : result['num']})
    }

    OnClickNoticeBoardItem(e){
        this.props.history.push('/notice_board/' + e)
    }

    OnClickFreeBoardItem(e){
        this.props.history.push('/free_board/' + e)
    }

    OnClickFreeBoardContentPrevious(e){
        let currentFreeBoardIdx = this.state.currentFreeBoardIdx;
        const freeBoardNum = this.state.freeBoardNum;

        if(currentFreeBoardIdx == 0)
            return;

        currentFreeBoardIdx = currentFreeBoardIdx - 1
        console.log("Current Free Board : ", currentFreeBoardIdx);

        this.setFreeBoardList(currentFreeBoardIdx);

        this.setState({currentFreeBoardIdx: currentFreeBoardIdx})
    }

    OnClickFreeBoardContentNext(e){
        let currentFreeBoardIdx = this.state.currentFreeBoardIdx;
        const freeBoardNum = this.state.freeBoardNum;
        console.log("Current Free Board : ", currentFreeBoardIdx, freeBoardNum);
        if ((currentFreeBoardIdx + 1) * 10 >= freeBoardNum)
            return;



        currentFreeBoardIdx = currentFreeBoardIdx + 1
        this.setFreeBoardList(currentFreeBoardIdx);

        this.setState({currentFreeBoardIdx: currentFreeBoardIdx})
    }

    OnClickNoticeBoardContentPrevious(e){
        let currentNoticeBoardIdx = this.state.currentNoticeBoardIdx;

        if(currentNoticeBoardIdx == 0)
            return;

        currentNoticeBoardIdx = currentNoticeBoardIdx - 1
        this.setNoticeBoardList(currentNoticeBoardIdx);

        this.setState({currentNoticeBoardIdx: currentNoticeBoardIdx})
    }

    OnClickNoticeBoardContentNext(e) {
        let currentNoticeBoardIdx = this.state.currentNoticeBoardIdx;
        const noticeBoardNum = this.state.noticeBoardNum;

        if ((currentNoticeBoardIdx + 1) * 10 >= noticeBoardNum)
            return;

        currentNoticeBoardIdx = currentNoticeBoardIdx + 1
        this.setNoticeBoardList(currentNoticeBoardIdx);

        this.setState({currentNoticeBoardIdx: currentNoticeBoardIdx})
    }

    render() {
        return (
            <IPlatIntroductionPageUI
                // UI
                WindowWidth={this.props.WindowWidth}
                WindowHeight={this.props.WindowHeight}

                // State
                USER_ID={this.state.USER_ID}
                isManager={this.state.isManager}

                NoticeBoardList={this.state.NOTICE_BOARD_LIST}
                FreeBoardList={this.state.FREE_BOARD_LIST}

                UserName={this.state.UserName}
                DeviceNumber={this.state.DeviceNumber}
                SensorNumber={this.state.SensorNumber}

                // Handler
                OnClickNoticeBoardItem={this.OnClickNoticeBoardItem.bind(this)}
                OnClickFreeBoardItem={this.OnClickFreeBoardItem.bind(this)}

                selectedNoticeBoardItemId={this.state.selectedNoticeBoardItemId}

                selectedFreeBoardItemId={this.state.selectedFreeBoardItemId}

                OnClickFreeBoardContentPrevious={this.OnClickFreeBoardContentPrevious.bind(this)}
                OnClickFreeBoardContentNext={this.OnClickFreeBoardContentNext.bind(this)}
                OnClickNoticeBoardContentPrevious={this.OnClickNoticeBoardContentPrevious.bind(this)}
                OnClickNoticeBoardContentNext={this.OnClickNoticeBoardContentNext.bind(this)}
            />
        );
    }
}

export default withRouter(IPlatIntroductionPage);
