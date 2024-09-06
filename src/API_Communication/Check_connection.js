import { URL_Connection } from "../connection/Url_connection";
import axios from "axios";

// check the system is online or offline
export const Check_Connection=async()=>{
    try{
        const url = await URL_Connection();
        console.log(url);
        const response = await axios.get(`${url}`);
        let status = response.data.status;
        console.log(status);
        return await status;
    }
    catch(error){
        console.log(error);
    }
}