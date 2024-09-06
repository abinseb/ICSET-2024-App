// import { LOGIN_SUCCESS,LOGOUT_SUCCESS } from "./Actions";

const initialState ={
    isAuthenticated:false,
    username:null,
    token:null,
    // loading:false,
    // error:null
};

const authReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return{...state ,
                isAuthenticated:true,
                username:action.payload.username,
                token:action.payload.token,
            };
        case 'LOGOUT_SUCCESS':
            return{...state ,
                isAuthenticated:false,
                username:null,
                 token:null
                };
        default:
            return state;
    };
};

export default authReducer