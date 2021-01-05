import axiosPost from "./utils"
import {netFileUpload} from "./free_board";

export async function netArchiveList(currentNoticeBoardIdx) {
    let result = await axiosPost(
        "/archive/get_list",
        {
            "current_idx": currentNoticeBoardIdx,
        })

    return result['data']
}

export async function netArchiveContent(no) {
    let result = await axiosPost(
        "/archive/get_content",
        {
            "no": no,
        })
    console.log(result);
    return result['data']
}

export async function netArchiveDel(no) {
    let result = await axiosPost(
        "/archive/delete_content",
        {
            "no": no,
        })

    return result['data']
}

export async function registerArchiveContent(userId, userToken, title, content, fileList=null) {
    const fileNameList = []
    for(var i = 0 ; i < fileList.length ; i++)
        fileNameList.push(fileList[i].name);

    let result = await axiosPost(
        "/archive/register",
        {
            'user_id': userId,
            'user_token': userToken,
            'title': title,
            'content': content,
            'file_name_list': fileNameList,
        })

    for(var i = 0 ; i < fileList.length ; i++){
        netArchiveFileUpload(fileList[i])
    }

    return result['data']
}

export async function netArchiveFileUpload(file){
    let formData = new FormData();
    formData.append('file', file);

    let result = await axiosPost("/archive/file_upload", formData)
}

export async function netArchiveFileDownload(file_name){
    let r = await axiosPost(
        "/archive/file_download",
        {
            "file_name": file_name
        },{
            responseType: 'blob'
        }).then((data) => {
        console.log("This is data : ", data)
        const link = document.createElement('a');
        const url = URL.createObjectURL(new Blob([data.data], ));
        link.download = file_name;
        link.href = url;

        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);

    }).catch((e) => {
        console.log("Error : ", e)
    });
}
