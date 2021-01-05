import React, {useEffect} from 'react';


import './App.css';

import {Route, BrowserRouter as Router, Redirect, Switch} from "react-router-dom"

import IPlatIntroductionPage from "./ui/page/iplat_introduction_page";
import IPlatDeviceManagementPage from "./ui/page/iplat_device_management_page";
import IPlatLoginPage from "./ui/page/iplat_login_page";
import IPlatRegisterPage from "./ui/page/iplat_register_page";
import ErrorPage from "./ui/page/iplat_error_page";
import IPlatDashboardPage from "./ui/page/iplat_dashboard_page";
import IPlatOpenApiPage from "./ui/page/iplat_open_api_page";
import IPlatBoardWrittingPage from "./ui/page/iplat_notice_board_writting_page";
import IPlatNoticeBoardViewPage from "./ui/page/iplat_notice_board_view_page";
import IPlatFreeBoardViewPage from "./ui/page/iplat_free_board_view_page";
import IPlatNoticeBoardWrittingPage from "./ui/page/iplat_notice_board_writting_page";
import IPlatFreeBoardWrittingPage from "./ui/page/iplat_free_board_writting_page";
import IPlatArchivePage from "./ui/page/iplat_archive_page";
import IPlatArchiveBoardViewPage from "./ui/page/iplat_archive_view_page";
import IPlatArchiveBoardWrittingPage from "./ui/page/iplat_archive_writting_page";

function App() {
    useEffect(()=>{window.onbeforeunload = function () {return false;}})

    return (
        <div style={{
            backgroundColor:"#14171A",
            width:"100vw",
            height:"100vh"}}>

            <Router>
                <Switch>
                    <Route path="/home" component={() => <IPlatIntroductionPage/>}/>
                    <Route path="/device_management" component={() => <IPlatDeviceManagementPage/>}/>
                    {/*<Route path="/dashboard" component={() => <IPlatDashboardPage/>}/>*/}
                    <Route path="/openapi"  component={() => <IPlatOpenApiPage/>}/>
                    <Route path="/archive" component={() => <IPlatArchivePage/>}/>


                    <Route exact path="/" component={() => <IPlatLoginPage/>}/>
                    <Route path="/register" component={() => <IPlatRegisterPage/>}/>
                    <Route path="/unknown" component={() => <ErrorPage/>}/>

                    <Route path="/notice_board_writting" component={() => <IPlatNoticeBoardWrittingPage/>}/>
                    <Route path="/free_board_writting" component={() => <IPlatFreeBoardWrittingPage/>}/>
                    <Route path="/archive_writting" component={() => <IPlatArchiveBoardWrittingPage/>}/>

                    <Route path="/notice_board/:no" component={(no) => <IPlatNoticeBoardViewPage component={no} />}/>
                    <Route path="/free_board/:no" component={(no) => <IPlatFreeBoardViewPage component={no} />}/>
                    <Route path="/archive_content/:no" component={(no) => <IPlatArchiveBoardViewPage component={no} />}/>

                    <Redirect from='*' to='/unknown' />
                </Switch>
            </Router>

        </div>

    );
}

export default App;
