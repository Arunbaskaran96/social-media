

const AuthReducer=(state,action)=>{
    switch (action.type) {
        case "login_start":
            return {
                user:null,
                isFetching:true,
                isError:false
            }
        case "success":
            return {
                user:action.payload,
                isFetching:false,
                isError:false
            }
        case "failure":
            return {
                user:null,
                isFetching:false,
                isError:action.payload
            }
            case "follow":
                return {
                        ...state,
                        user:{
                            ...state.user,
                            followings:[...state.user.followings,action.payload]
                        }
                }
            case "unfollow" :
                return{
                    ...state,user :{
                        ...state.user,
                        followings:state.user.followings.filter((item)=>item!=action.payload)
                    }
                }
            
        
            break;
    
        default:
            return state
            ;
    }
}

export default AuthReducer