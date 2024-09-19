import axios from "axios";
import { URL_Connection } from "../connection/Url_connection";

const url = URL_Connection();
export const authenticate_Volunteer=async(username,password)=>{
    try{
        console.log(`${url}api/volunteer/auth/login`)
        const authResponse = await axios.post(`${url}/api/volunteer/auth/login`,{
            "email" : username,
            "password" : password
        })
        return authResponse
    }
    catch(err){
        return err;
    }
}