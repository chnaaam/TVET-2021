export function checkUserSession(){
    let isSessionOk = false;

    let userId = window.sessionStorage.getItem('USER_ID')
    let userToken = window.sessionStorage.getItem('USER_TOKEN')
    let isManager = window.sessionStorage.getItem('IS_MANAGER')


    if(userId != "")
       isSessionOk = true;

    isManager = isManager == 1 ? true : false;

    return {
        userId: userId,
        userToken: userToken,
        isManager: isManager,
        isSessionOk: isSessionOk
    }
}
