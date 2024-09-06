import { getEventId } from "../AsyncStorage/StoreUserCredentials";

export const URL_Connection=()=>{
    const apiurl = 'http://192.168.1.165:4000';
    return apiurl;
}

export const eventID=async()=>{
    const eventid = await getEventId();
    console.log("StoredEventId",eventid);
    return  eventid;
}
