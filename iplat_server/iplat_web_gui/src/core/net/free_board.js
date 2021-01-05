import axiosPost from "./utils"

export async function netFreeBoardList(idx) {
    let result = await axiosPost(
        "/free_board/get_list",
        {
            'current_idx': idx,
        })

    return result['data']
}

export async function registerFreeBoardContent(userId, userToken, title, content, fileList=null) {
    const fileNameList = []
    for(var i = 0 ; i < fileList.length ; i++)
        fileNameList.push(fileList[i].name);

    let result = await axiosPost(
        "/free_board/register",
        {
            'user_id': userId,
            'user_token': userToken,
            'title': title,
            'content': content,
            'file_name_list': fileNameList,
        })

    for(var i = 0 ; i < fileList.length ; i++){
        netFreeboardFileUpload(fileList[i])
    }

    return result['data']
}

export async function netFreeBoardContent(no) {
    let result = await axiosPost(
        "/free_board/get_content",
        {
            "no": no,
        })

    return result['data']
}

export async function netFreeBoardDel(no) {
    let result = await axiosPost(
        "/free_board/delete_content",
        {
            "no": no,
        })

    return result['data']
}

export async function netFreeboardFileUpload(file){
    let formData = new FormData();
    formData.append('file', file);

    let result = await axiosPost("/free_board/file_upload", formData)
}

export async function netFreeBoardFileDownload(file_name){
    // await axiosFileDownload("/free_board/file_download", file_name)
    let r = await axiosPost(
        "/free_board/file_download",
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
