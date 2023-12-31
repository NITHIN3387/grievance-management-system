import config from "@config/serverConfig"

const authAdmin = async () => {
    let userData = null

    try{
        //fetching user details by his id
        await fetch(config.serverUrl + "/user/get-admin", {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((res) => {
            // checking whether we get user details or not 
            if (res.status == "success")
                userData = res.data
        })
    } catch (err) {
        console.log("fail to fetch user details\n", err);
    }
    
    return userData
}

export default authAdmin