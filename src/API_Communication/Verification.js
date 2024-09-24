import axios from "axios";

import { URL_Connection,eventID } from "../connection/Url_connection";
import { getEventId, getToken } from "../AsyncStorage/StoreUserCredentials";


// fetch url
const url = URL_Connection();

// fetch eventId
const eventid = eventID();

export const userVerification=async(verification,regid)=>{
    const event_id = await getEventId();
    const {token} =  await getToken();
    console.log("parms----------->>>",verification,regid,event_id, "regid",regid);
    try {
        const response = await axios.post(`${url}/api/volunteer/event-entry/attendee-verify/${event_id}/${regid}`, {
            "status":verification
        },
        {
            headers:{
                Authorization:token,
            }
        }
    );
        return response; // Return the value
    
    } catch (error) {
        return error;
    }
    
}


export const userBulkVerification =async(userIdArray)=>{
    const event_id = await getEventId();
    const {token} =  await getToken();
    try{
        const respose = await axios.post(`${url}/api/volunteer/event-entry/attendee-verify/bulk`,{
             "registrationIds":userIdArray
        },{
            headers:{
                Authorization:token
            }
        });

        return respose;
    }
    catch(error){
        return error;
}
}





export const sync_OfflineData_verification=async(offlineData)=>{
    const event_id = await getEventId();
    const {token} = await getToken();
    try{
      const response = await axios.post(`${url}/api/volunteer/event-entry/db/syn-offline`,{
            "eventid" : event_id,
            "data" :offlineData,
        },{
            headers:{
                Authorization:token
            }
        });
        console.log(response.data);
        return response;
    }
    catch(errr){
        console.log("Error in syncing",errr);
        return errr;
    }
}