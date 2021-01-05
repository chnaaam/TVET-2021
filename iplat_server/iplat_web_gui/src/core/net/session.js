import axios from 'axios'

import axiosPost from "./utils"
import {CODE} from "./err_code";
import {SERVER} from "./config";

export async function netGetSession() {
    let result = await axiosPost(
        "/user/session",
        null,
        {withCredentials: true}
        ).then(function(e){
        return e;
    }).catch(function(e){
        return false;
    })

    // let result = await axios.get(
    //     SERVER.IP + '/user/session',
    //     null,
    //     {withCredentials: true}
    // );

    console.log("Result : ", result);

    if(result['data']['CODE'] == CODE.SESSION_SUCCESS)  return result['data'];
    else return null;
}
