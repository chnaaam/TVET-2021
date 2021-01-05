import axios from 'axios'

import {SERVER} from './config'

export default async function axiosPost(sub_url, data, option=null, config=null) {

    let result = await axios.post(
        SERVER.IP + sub_url,
        data,
        option,
        config
    );

    return result
}

export async function axiosFileDownload(sub_url, data) {
    axios({
        method: 'post',
        url: SERVER.IP + sub_url,
        responseType: 'blob',
    }).then((data) => {
        console.log("This is data : ", data)
        const link = document.createElement('a');
        const url = URL.createObjectURL(new Blob([data.data], {type: "application/pdf"}));
        link.download = data;
        link.href = url;

        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);

    }).catch((e) => {
        console.log("Error : ", e)
    });
}
