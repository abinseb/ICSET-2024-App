// export const LOGIN_SUCCESS ='LOGIN_SUCCESS';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


export const loginSuccess =(username,token)=>({
    type:'LOGIN_SUCCESS',
    payload:{username,token},
});

export const logoutSuccess=()=>({
    type:'LOGOUT_SUCCESS',
});


// login user 
export const loginUser =(username,token)=>{
    return(dispatch)=>{
        dispatch(loginSuccess(username,token));
    };
};



// workshop details
export const worshopSelect =(workshop)=>{
    return{
        type:'SET_WORKSHOP_STRING',
        payload:workshop
    };
}