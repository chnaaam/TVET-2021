import axiosPost from "./utils"

export async function netUserLogin(id, pw) {
    let result = await axiosPost(
        "/user/login",
        {
            "user_id": id,
            "user_pw": pw
        })

    return result['data']
}

export async function netUserRegister(id, email, pw) {
    let result = await axiosPost(
        "/user/register",
        {
            "user_id": id,
            "user_email" : email,
            "user_pw": pw
        })

    return result['data']
}

export async function netUserLogout(id) {
    let result = await axiosPost(
        "/user/logout",
        {
            "user_id": id
        },  {withCredentials: true})

    return result['data']
}

export async function netUserName(userToken) {
    let result = await axiosPost(
        "/user/name",
        {
            "user_token": userToken
        },  {withCredentials: true})

    return result['data']
}

export async function netSalt(){
    let result = await axiosPost(
        "/user/salt",
    )

    return result["data"]["salt"]
}
