import { getEventId } from "../AsyncStorage/StoreUserCredentials";

export const URL_Connection=()=>{
    const apiurl = 'https://apps.ictkerala.org';
    return apiurl;
}

export const eventID=async()=>{
    const eventid = await getEventId();
    console.log("StoredEventId",eventid);
    return  eventid;
}
