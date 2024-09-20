import axios from "axios";
import { URL_Connection,eventID } from "../connection/Url_connection";
import { maximumTimeStampFetch } from "../SQLDatabaseConnection/Max_timestamp";
import { update_local_Table } from "../SQLDatabaseConnection/Update_Table";
import { getEventId, getToken } from "../AsyncStorage/StoreUserCredentials";


// url connection
const url = URL_Connection();
// eventid

export const dataFetchbasedOnTimeStamp=async()=>{

    const evnid = await getEventId();
    const {token} = await getToken();
    try{
       const maxTime = await maximumTimeStampFetch();
       console.log("max--time---",maxTime)
        const response = await axios.post(`${url}/api/volunteer/event-entry/background-sync`,{
                                        // "event" : eventid,
                                        "maximiumTime": maxTime,
                                        "event_id" : evnid

                                    },{
                                        headers:{
                                            Authorization:token
                                        }
                                    });
     
        console.log("dataa_______",response.data);
        update_local_Table(response.data);
        return response.data;

    }
    catch(error){
        console.log("Error",error);
    }
}



// http://43.205.112.24:3000/timestamp

//{
   // "event" : "6549f0527a62f323d043db53",
    //"timestamp":"2023-12-07T15:46:39.678Z"
//}