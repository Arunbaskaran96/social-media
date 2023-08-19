import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"
const INITIAL_STATE ={
    user:null
    ,
    isFetching:false,
    isError:false
}

export const AuthContext=createContext(INITIAL_STATE)

export const AuthProvider=({children})=>{

    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE,()=>{
        const localdata=localStorage.getItem("user");
        return localdata ? JSON.parse(localdata) : INITIAL_STATE
    })
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state))
    },[state])
    return(
        <AuthContext.Provider value={{
            user:state.user,isFetching:state.isFetching,isError:state.isError,dispatch
        }}>{children}</AuthContext.Provider>
    )
}