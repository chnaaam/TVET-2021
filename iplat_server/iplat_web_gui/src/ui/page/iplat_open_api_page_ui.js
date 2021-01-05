import React from 'react';
import './css/iplat_bar_design.css'

import IPlatNavigation from "../templates/nav_bar/iplat_navigation";
import IPlatDashboardPanel from "../templates/dashboard/iplat_dashboard_panel";
import IPlatDashboardWorkspace from "../templates/dashboard/iplat_dashboard_workspace";
import IPlatOpenApiTemplate from "../templates/openapi/iplat_openapi_template";
import IPlatOpenApiTemplateHeader from "../templates/openapi/iplat_openapi_template_header";
import {Redirect} from "react-router-dom";

function IPlatOpenApiPageUI(props){
    return (
        <div>
            <IPlatNavigation UserID={props.user.id} ClickLogout={props.clickLogout}/>

            <div style={{ height: "100vh", display: 'flex', justifyContent: 'center'}}>
                <div className={"open-api-scroll"} style={{ width: "50%", overflowX: 'hidden', overflowY: "auto" }}>
                    {/****************************************************************************/}
                    {/*- User */}
                    {/****************************************************************************/}
                    <IPlatOpenApiTemplateHeader/>
                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Login"}
                        ApiDescription={"사용자 계정을 입력하여 로그인"}
                        ApiSubUrl={"/api/user/login"}
                        ApiParameter={[
                            {
                                'parameter':'user_id',
                                'description':'user id',
                                'data_type':'string',
                                'example':'test_account_id'
                            },
                            {
                                'parameter':'user_pw',
                                'description':'user password',
                                'data_type':'string',
                                'example':'test_account_pw'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Register"}
                        ApiDescription={"사용자의 정보를 입력하여 등록"}
                        ApiSubUrl={"/api/user/register"}
                        ApiParameter={[
                            {
                                'parameter':'user_id',
                                'description':'user id',
                                'data_type':'string',
                                'example':'test_account_id'
                            },
                            {
                                'parameter':'user_pw',
                                'description':'user password',
                                'data_type':'string',
                                'example':'test_account_pw'
                            },
                            {
                                'parameter':'user_email',
                                'description':'user email',
                                'data_type':'string',
                                'example':'test_account_email'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>



                    {/****************************************************************************/}
                    {/*- Device */}
                    {/****************************************************************************/}
                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get device list"}
                        ApiDescription={"사용자가 등록한 디바이스 리스트를 가져옴"}
                        ApiSubUrl={"/api/device/list"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Register"}
                        ApiDescription={"디바이스를 등록"}
                        ApiSubUrl={"/api/device/register"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_name',
                                'description':'device name',
                                'data_type':'string',
                                'example':'test_device_name'
                            },
                            {
                                'parameter':'device_type',
                                'description':'device type',
                                'data_type':'string',
                                'example':'test_device_type'
                            },
                            {
                                'parameter':'protocol_type',
                                'description':'protocol type',
                                'data_type':'string',
                                'example':'test_protocol_type'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get device information"}
                        ApiDescription={"사용자가 등록한 디바이스 중 선택한 디바이스의 정보를 가져옴"}
                        ApiSubUrl={"/api/device/information"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Delete"}
                        ApiDescription={"등록된 특정 디바이스의 정보를 삭제"}
                        ApiSubUrl={"/api/device/delete"}
                        ApiParameter={[
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Edit"}
                        ApiDescription={"등록된 특정 디바이스의 정보를 수정"}
                        ApiSubUrl={"/api/device/edit"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'device_name',
                                'description':'device name',
                                'data_type':'string',
                                'example':'test_device_name',
                            },
                            {
                                'parameter':'protocol_type',
                                'description':'protocol type',
                                'data_type':'string',
                                'example':'test_protocol_type',
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>


                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get device number"}
                        ApiDescription={"사용자가 등록한 디바이스 개수를 가져옴"}
                        ApiSubUrl={"/api/device/num"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                        {/****************************************************************************/}
                        {/*- Sensor */}
                        {/****************************************************************************/}
                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get sensor list"}
                        ApiDescription={"사용자가 등록한 특정 디바이스 내의 센서 리스트를 가져옴"}
                        ApiSubUrl={"/api/sensor/list"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Register"}
                        ApiDescription={"특정 디바이스 내의 센서를 등록"}
                        ApiSubUrl={"/api/sensor/register"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_name',
                                'description':'sensor name',
                                'data_type':'string',
                                'example':'test_sensor_name'
                            },
                            {
                                'parameter':'sensor_type',
                                'description':'sensor type',
                                'data_type':'string',
                                'example':'test_sensor_type'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get sensor information"}
                        ApiDescription={"사용자가 등록한 특정 디바이스 내의 등록된 특정 센서의 정보를 가져옴"}
                        ApiSubUrl={"/api/sensor/information"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Delete"}
                        ApiDescription={"특정 디바이스 내의 등록된 특정 센서의 정보를 삭제"}
                        ApiSubUrl={"/api/sensor/delete"}
                        ApiParameter={[
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Edit"}
                        ApiDescription={"특정 디바이스 내의 등록된 특정 선서의 정보를 수정"}
                        ApiSubUrl={"/api/sensor/edit"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            },
                            {
                                'parameter':'sensor_name',
                                'description':'sensor name',
                                'data_type':'string',
                                'example':'test_sensor_name'
                            },
                            {
                                'parameter':'sensor_type',
                                'description':'sensor type',
                                'data_type':'string',
                                'example':'test_sensor_type'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>


                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get sensor number"}
                        ApiDescription={"사용자가 등록한 특정 디바이스 내의 센서의 개수를 가져옴"}
                        ApiSubUrl={"/api/sensor/num"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'user_pw',
                                'description':'user password',
                                'data_type':'string',
                                'example':'test_account_pw'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>

                        {/****************************************************************************/}
                        {/*- Data */}
                        {/****************************************************************************/}
                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get data list"}
                        ApiDescription={"특정 디바이스와 센서 내의 수집된 데이터의 리스트를 가져옴"}
                        ApiSubUrl={"/api/data/list"}
                        ApiParameter={[
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            }
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        }/>


                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Get data content"}
                        ApiDescription={"특정 디바이스와 센서 내의 특정 데이터를 가져옴"}
                        ApiSubUrl={"/api/data/contents"}
                        ApiParameter={[
                            {
                                'parameter':'user_token',
                                'description':'user token',
                                'data_type':'string',
                                'example':'test_account_token'
                            },
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            },
                            {
                                'parameter':'start_time',
                                'description':'start time',
                                'data_type':'string',
                                'example':'test_start_time'
                            },
                            {
                                'parameter':'content_index',
                                'description':'content index',
                                'data_type':'string',
                                'example':'test_content_index'
                            },
                            {
                                'parameter':'data_length',
                                'description':'data length',
                                'data_type':'string',
                                'example':'test_data_length'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    <IPlatOpenApiTemplate
                        ApiMethod={"POST"}
                        ApiTitle={"Start monitoring"}
                        ApiDescription={"실시간 데이터 수집"}
                        ApiSubUrl={"/api/data/monitoring/start"}
                        ApiParameter={[
                            {
                                'parameter':'device_id',
                                'description':'device id',
                                'data_type':'string',
                                'example':'test_device_id'
                            },
                            {
                                'parameter':'sensor_id',
                                'description':'sensor id',
                                'data_type':'string',
                                'example':'test_sensor_id'
                            },
                        ]}
                        ApiResponse={
                            "{\n" +
                            "  \"status\" (bool): \"Response Code\",\n" +
                            "  \"user_token\" (string): \"User Token\"\n" +
                            "}\n"
                        } isNotUsed={true}/>

                    {/* 밑에 짤림 현상을 방지하기 위해 */}
                    <div style={{
                        width: "100px",
                        height: '100px',
                        // backgroundColor:"pink"
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default IPlatOpenApiPageUI;
