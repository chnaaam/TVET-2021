import React from 'react';
import {COLORS} from "../component/resources/iplat_colors";
import IPlatTextLogo from "../templates/logo/iplat_text_logo";
import IPlatInputField from "../templates/text_field/iplat_input_field";
import IPlatDefaultButton from "../templates/button/iplat_default_button";
import IPlatWarningText from "../templates/text/iplat_warning_text";
import {Redirect} from "react-router-dom";

function IPlatRegisterPageUI(props){
    return (
        <div>
            <div style={{
                background:COLORS.BACKGROUND,
                width:"100%",
                height:"100vh",
                display:"flex",
                flexDirection:"row",
                flexWrap:"nowrap",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <div style={{
                    padding:"40px 10px",
                    display:"flex", flexDirection:"col", flexWrap:"wrap",
                    width: "410px", height:"565px", justifyContent:"center",
                    backgroundColor:COLORS.FRAME_BACKGROUND,
                    border:"1px solid #373737" }}>

                    <h1 style={{display:"block", height:"100px"}}>
                        <IPlatTextLogo/>
                    </h1>

                    <div style={{
                        display:"flex", flexDirection:"col", flexWrap:"wrap",
                        width: "330px", height:"260px", justifyContent:"center"}}>

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
                            Type={"email"}
                            PlaceHolder={"Email"}
                            IsReadOnly={false}

                            Display={"block"}
                            W={"330px"}
                            H={"48px"}
                            Color={COLORS.TEXT}
                            BgColor={COLORS.BACKGROUND}

                            HandleChange={props.handleChangeEmailField}/>

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

                            HandleChange={props.handleChangePwField}/>

                        <IPlatInputField
                            Type={"password"}
                            PlaceHolder={"Confirm Password"}
                            MaxLength={"20"}
                            MinLength={"10"}
                            IsReadOnly={false}

                            Display={"block"}
                            W={"330px"}
                            H={"48px"}
                            Color={COLORS.TEXT}
                            BgColor={COLORS.BACKGROUND}

                            HandleChange={props.handleChangeConfirmPwField}/>
                    </div>
                    {
                        props.IS_WARNING_MSG_SHOW ?
                            <IPlatWarningText
                                Title={props.WARNING_MSG}
                                FontColor={"red"}
                                FontSize={"10px"}/>
                            :
                            null
                    }

                    <IPlatDefaultButton
                        Title={"New Account"}

                        FontSize={"20px"}
                        Display={"block"}
                        W={"330px"}
                        H={"50px"}
                        BgColor={COLORS.BUTTON}
                        BgHoverColor={COLORS.BUTTON_HOVER}
                        OnClick={props.clickRegister}/>
                </div>
            </div>
        </div>
    );
}

export default IPlatRegisterPageUI;
