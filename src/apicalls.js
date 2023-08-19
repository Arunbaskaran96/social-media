import axios from "axios"



export const loginCall=async(userCrendentials,dispatch)=>{
    dispatch({type:"login_start"})
    try {
        const res=await axios.post("http://localhost:8000/api/auth/login",userCrendentials)
        dispatch({type:"success",payload:res.data})
    } catch (error) {
        dispatch({type:"failure",payload:error})
    }
}