import axios from "axios";
import { URL_Connection } from "../connection/Url_connection";

const url = URL_Connection();
export const authenticate_Volunteer=async(username,password)=>{
    try{
        const authResponse = await axios.post(`${url}/api/student/login`,{
            "email" : username,
            "password" : password
        })
        return authResponse
    }
    catch(err){
        return err;
    }
}