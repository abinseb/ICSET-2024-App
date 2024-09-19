import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveEventId=async(eventid)=>{
    try{
        await AsyncStorage.setItem('EventId',eventid);
    }
    catch(err){
        console.error(err);
    }
}

export const getEventId=async()=>{
    try{
        const EventId = await AsyncStorage.getItem('EventId');
        console.log(EventId)
        return await EventId;
    }
    catch(err){
        console.error(err);
    }
}

export const removeEventId =async()=>{
    try{
       
        await AsyncStorage.removeItem('EventId');
    }
    catch(err){
        console.log(err);
    }
}
// To save user data (username and , token)
export const saveUserData = async(token)=>{
    try{
        const userData = JSON.stringify({token});
        await AsyncStorage.setItem('userData',userData);
    }
    catch(error){
        console.error('Error in user data saving',error);
    }
};

// To retrive user data
export const getToken =async()=>{
    try{
        const userData = await AsyncStorage.getItem('userData');
        if(userData !== null){
            const parsedUserData = JSON.parse(userData);

            // return user name annd token seperately
            const {token} = parsedUserData;
            return {token};
        }
        else{
            console.log("username and token are null");
            
            return { token: null };
        }
    }
    catch(error){
        console.error('Error retriving user Data',error);
    }
};

// To remove user data
export const removeUserData =async()=>{
    try{
        await AsyncStorage.removeItem('userData');
    }
    catch(error){
        console.error('Error removing user data:', error);
    }
}