const initialState={
    workshopName:'',
};

const workshopReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET_WORKSHOP_STRING':
            return{
                ...state,
                workshopName:action.payload,
            };
            default:
                return state;
    }
};

export default workshopReducer;