import axios from "axios";

import { URL_Connection,eventID } from "../connection/Url_connection";
import { getEventId } from "../AsyncStorage/StoreUserCredentials";


// fetch url
const url = URL_Connection();

// fetch eventId
const eventid = eventID();

export const userVerification=async(verification,regid)=>{
    const event_id = await getEventId();
    console.log("parms----------->>>",verification,regid,event_id, "regid",regid);
    try {
        const response = await axios.post(`${url}/api/volunteer/event-entry/attendee-verify/${event_id}/${regid}`, {
            "status":verification
        }
        // ,{
        //     headers:{
        //         Authoriztion:token,
        //     },
        // }
    );
        return response; // Return the value
    
    } catch (error) {
        return error;
    }
    
}




export const unverify_user=async(userid,worshopname,token)=>{
    const event_id = await getEventId();
    try{
        console.log("dtaaaa",userid,worshopname);
        const response = await axios.post(`${url}/volunter/unverify`,{
            "eventid":event_id,
            "workshop" : worshopname,
            "userid" : userid
        },{
            headers:{
                Authoriztion:token,
            },
        });
        console.log("out",response.data);
        return await response.data.verification;
    }
    catch(errr){
        console.error("error in unverification",errr.response.status);
        return errr.response.status;
    }
}

// http://localhost:3000/volunter/sync

export const sync_OfflineData_verification=async(offlineData)=>{
    const event_id = await getEventId();
    try{
      const response = await axios.post(`${url}/api/volunteer/event-entry/db/syn-offline`,{
            "eventid" : event_id,
            "data" :offlineData,
        });
        console.log(response.data);
        return response;
    }
    catch(errr){
        console.log("Error in syncing",errr);
        return errr;
    }
}