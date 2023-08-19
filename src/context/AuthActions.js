
export const loginStart=(userCredential)=>{
    return {
        type:"login_start"
    }
}

export const loginSuccess=(user)=>{
    return {
        type:"sucess",
        payload:user
    }
}

export const loginFailure=(error)=>{
    return {
        type:"failure",
        payload:error
    }
}


export const followUser=(userId)=>{
    return{
        type:"follow",
        payload:userId

    }
}

export const unfollowUser=(userId)=>{
    return{
        type:"unfollow",
        payload:userId
    }
}