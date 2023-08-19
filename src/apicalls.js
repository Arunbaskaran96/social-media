import axios from "axios"



export const loginCall=async(userCrendentials,dispatch)=>{
    dispatch({type:"login_start"})
    try {
        const res=await axios.post("https://social-media-backend-f9xi.onrender.com/api/auth/login",userCrendentials)
        dispatch({type:"success",payload:res.data})
    } catch (error) {
        dispatch({type:"failure",payload:error})
    }
}