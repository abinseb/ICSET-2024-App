import axios from "axios";
import { URL_Connection,eventID } from "../connection/Url_connection";
import { maximumTimeStampFetch } from "../SQLDatabaseConnection/Max_timestamp";
import { update_local_Table } from "../SQLDatabaseConnection/Update_Table";


// url connection
const url = URL_Connection();
// eventid
const eventid = eventID();
export const dataFetchbasedOnTimeStamp=async()=>{
    try{
       const maxTime = await maximumTimeStampFetch();
       console.log(maxTime)
       console.log(`${url}/timestamp`,eventid);
        const response = await axios.post(`${url}/timestamp`,{
                                        "event" : eventid,
                                        "timestamp": maxTime
                                    });
     const updatedData = response.data;
        console.log("dataa_______",updatedData);
        const workshop = Object.keys(updatedData.particpants[0].workshops);
        console.log("Workshops",workshop);
        update_local_Table(updatedData,workshop);

        return updatedData.particpants;

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