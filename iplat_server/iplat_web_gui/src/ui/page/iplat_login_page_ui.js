import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {COLORS} from "../component/resources/iplat_colors";
import IPLAT_LOGO from "../component/resources/imgs/IPLAT_LOGO.png"

import IPlatTextLogo from "../templates/logo/iplat_text_logo";
import IPlatInputField from "../templates/text_field/iplat_input_field";
import IPlatDefaultButton from "../templates/button/iplat_default_button";
import IPlatDefaultTextButton from "../templates/button/iplat_default_text_button";
import IPlatWarningText from "../templates/text/iplat_warning_text";

function IPlatLoginPageUI(props){
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"nowrap",
            background:COLORS.BACKGROUND,
            width:"100%",
            height:"100vh",
            justifyContent:"center",
            alignItems:"center",

        }}>
            <div style={{
                padding:"70px 10px",
                display:"flex",
                flexDirection:"col",
                flexWrap:"wrap",
                width: "410px",
                height:"565px",
                backgroundColor:COLORS.FRAME_BACKGROUND,
                justifyContent:"center",
                alignItems:"center",
                border:"1px solid #373737"
            }}>
                <IPlatTextLogo
                    W={"225px"}
                    H={"64px"}
                    Display={"block"}
                    Img={IPLAT_LOGO}/>

                <div  style={{
                    width:"338px",
                    height:"150px",
                    display:"flex",
                    flexDirection:"col",
                    flexWrap:"wrap",
                }}>
                    <IPlatInputField
                        Type={"text"}
                        PlaceHolder={"User ID"}
                        MaxLength={"20"}
                        MinLength={"10"}
                        IsReadOnly={false}

                        Display={"block"}
                        W={"330px"}
                        H={"48px"}
                        Color={COLORS.TEXT}
                        BgColor={COLORS.BACKGROUND}

                        HandleChange={props.handleChangeIdField}/>

                    <IPlatInputField
                        Type={"password"}
                        PlaceHolder={"Password"}
                        MaxLength={"20"}
                        MinLength={"10"}
                        IsReadOnly={false}

                        Display={"block"}
                        W={"330px"}
                        H={"48px"}
                        Color={COLORS.TEXT}
                        BgColor={COLORS.BACKGROUND}

                        HandleChange={props.handleChangePwField}
                        OnEnterKey={props.handleKeyPress}
                    />
                </div>

                {
                    props.IS_WARNING_MSG_SHOW ?
                        <div style={{
                            width:"338px",
                            height:"20px",
                        }}>
                            <IPlatWarningText
                                FontSize={"12px"}
                                Title={props.WARNING_MSG}
                                FontColor={"red"}/>
                        </div>
                        :
                        null
                }

                <div>
                    <IPlatDefaultButton
                        Title={"LOGIN"}

                        FontSize={"20px"}
                        Display={"block"}
                        W={"330px"}
                        H={"50px"}
                        BgColor={COLORS.BUTTON}
                        BgHoverColor={COLORS.BUTTON_HOVER}

                        OnClick={props.clickLogin}
                        OnkeyPress={props.handleKeyPress}
                    />

                    <div style={{
                        marginTop:"20px",
                        width:"338px",
                        height:"20px",
                        display:"flex",
                        flexDirection:"row",
                        flexWrap:"wrap",
                        justifyContent:"flex-end",
                    }}>
                        <ul style={{
                            listStyleType:"none",
                            padding: "0px 0px",
                        }}>
                            <li style={{
                                display:"inline-block",
                                paddingRight:"10px",
                                borderRight:"1px solid #eaeaea"
                            }}>
                                <IPlatDefaultTextButton
                                    Title={"New Account"}
                                    FontColor={COLORS.TEXT_BUTTON}
                                    Display={"inline-block"}
                                    OnClick={props.clickRegister}/>
                            </li>
                            <li style={{
                                display:"inline-block",
                                paddingLeft:"10px",
                                marginRight:"10px"
                            }}>
                                <IPlatDefaultTextButton
                                    Title={"Find ID & PW"}
                                    FontColor={COLORS.TEXT_BUTTON}
                                    Display={"inline-block"}
                                    OnClick={props.clickFindIdPw}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default IPlatLoginPageUI;
