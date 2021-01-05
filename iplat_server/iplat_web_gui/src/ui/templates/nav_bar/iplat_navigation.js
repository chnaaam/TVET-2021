import React, {useState, useEffect} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';

import './css/iplat_navigation.css';

import IPlatIconTextLogo from "../logo/iplat_icon_text_logo";
import IPlatTextButton from "../../component/button/iplat_text_button";
import IPlatContent from "../../component/text/iplat_content";
import IPlatNavButton from "../../component/button/iplat_nav_button";
import userEvent from "@testing-library/user-event";

function IPlatNavigation(props){
    const navHeight = "60px";
    const txtBtnHeight = "20px";

    var userId = window.sessionStorage.getItem('USER_ID');
    var userToken = window.sessionStorage.getItem('USER_TOKEN');

    const [isLogined, setIsLogined] = useState(true);
    const [selectNav, setSelectNav] = useState("Home");

    let history = useHistory();

    useEffect(() => {
        async function checkIsLogined(){
            if(userToken === null || userToken === undefined)
                await setIsLogined(false)
        }

        const changeUri =  window.location.pathname.replace("/", "")
        if(changeUri == selectNav)
            return;

        setSelectNav(changeUri);
    },)


    function go2Introduction(){goto('/home')}
    function go2DeviceManagement(){goto('/device_management')}

    function goto(uri){
        // history.pushState(null, null, '/');
        // history.entries = [];
        // history.index = -1;
        // history.push(uri);
    }


    return(
        <div>
            <div className={"nav-body"}>
                <h1 style={{marginRight:"30px"}}>
                    <Link to={"/home"}><IPlatIconTextLogo W={"210px"} H={navHeight} Display={"block"}/></Link>
                </h1>

                <div>
                    <Link to={"/home"}><IPlatNavButton Title={"Home"} SelectNav={selectNav}/></Link>
                    <Link to={"/device_management"}><IPlatNavButton Title={"Device Management"} SelectNav={selectNav}/></Link>
                    {/*<Link to={"/dashboard"}><IPlatNavButton Title={"My Dashboard"}/></Link>*/}
                    <Link to={"/openapi"}><IPlatNavButton Title={"Open API"} SelectNav={selectNav}/></Link>
                    <Link to={"/archive"}><IPlatNavButton Title={"Archive"} SelectNav={selectNav}/></Link>
                </div>

                <span>
                    <ul className={"nav-user-control-content"}>
                        <li>
                            <div>
                                <IPlatContent
                                    H={txtBtnHeight}
                                    FontColor={"#FFFFFF"}
                                    Title={"Welcome " + userId}/>
                            </div>
                        </li>

                        <li>
                            <div className={"design-bar"}>
                                <Link to={'/'}>
                                <IPlatTextButton
                                    Title={"Logout"}
                                    FontColor={"#FFFFFF"}
                                    Display={"inline-block"}
                                    OnClick={() => {
                                        window.sessionStorage.clear()
                                    }}/>
                            </Link>
                            </div>
                        </li>
                    </ul>
                </span>
            </div>

            {isLogined ? null : <Redirect to={'/'}/>}
        </div>
    );
}

export default IPlatNavigation;
