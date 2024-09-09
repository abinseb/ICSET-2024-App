import axios from "axios";
import { URL_Connection, eventID } from "../connection/Url_connection";
import { insertWorkshopTable, insert_To_UserTable } from "../SQLDatabaseConnection/Insert_Table";
import { Create_user_table } from "../SQLDatabaseConnection/Create_Table";
import { update_user_Table } from "../SQLDatabaseConnection/Update_Table";
import { event_id } from "../SQLDatabaseConnection/FetchDataFromTable";
import { getEventId } from "../AsyncStorage/StoreUserCredentials";

// fetch url 
const url = URL_Connection();

// fetch evetid
const eventId = getEventId();
// load event data from server
export const event_Data_Get=async()=>{
  try{
    const event =  await axios.get(`${url}/api/register/event/get`);
    return event;
  }
  catch(error){
  return error
  }
}

// load user data
export const user_data_load=async()=>{
  const evnid = await getEventId();
  console.log("event id------------------------------------",evnid);
   try{
    const response = await axios.get(`${url}/api/volunteer/event-entry/get/${evnid}`); 
    return  response.data;;
    
   }
   catch(error){
      console.log('Error :',error);
   } 
}


// load userdata based on userid and eventid
export const user_data_based_on_id =async(userId)=>{
  const evnid = await getEventId();
  try{
    const response = await axios.get(`${url}/api/volunteer/event-entry/get/single/${userId}/${evnid}`);
    return  response;
  }
  catch(err){
    console.log('Error-------------------------- :',err);
    return err;
  }
}


// Group name list
export const Group_list_load=async()=>{
  const evnid = await getEventId();
    try{
        const response = await axios.get(`${url}/api/volunteer/event-entry/get/institutions/${evnid}`)
        console.log("__________list",response);
        return response;
      
    }
    catch(error){
      console.error("Error in fetching dataa", error);
      return error;
    }
}

// localhost:3000/volunter/getusergroup/6549f0527a62f323d043db53/655c3ddc1efe562dd9903413/oracle
// list the students based on the groups
export const List_userbasedOn_group=async(groupId,status)=>{
  const evnid = await getEventId();
  try{
      const response = await axios.post(`${url}/api/volunteer/event-entry/get/user/event/org`,{
        "eventid":evnid,
        "institutionid":groupId,
        "attendanceStatus":status
      })
      return response;
  }
  catch(error){
    console.error("Error in listing",error);
    return error;
  }
}

// unverified user data based on group and workshop
export const list_verifiedUserData_basedOngroup=async(groupid,workshopname)=>{
  const evnid = await getEventId();
    const response = await axios.get(`${url}/volunter/getusergroup/unverify/${evnid}/${groupid}/${workshopname}`);
    const verifiedUser = response.data;
    console.log("verified user based on group",verifiedUser);
    return await verifiedUser.data;
 
}


// fetch the user id from the userdata
export const fetchThe_userId=async(emailOrMobile)=>{
  const evnid = await getEventId();
  try{
    const userId = await axios.get(`${url}/volunter/search/${evnid}/${emailOrMobile}`)
    const userdata = userId.data;
    console.log("userId",userdata.data);
    return userdata.data;

  }
  catch(error){
    console.log("Error in fetching",error);
  }
}



export const loadAllEventData=async()=>{
  
  try{
    const eventDataList = await axios.get(`${url}/get/event`)
    console.log(`${url}/get/event`)
    const eventData = eventDataList.data.data;
    // console.log("Event dataloaddddk",eventData);
    const eventList = eventData.map((event)=>({id:event._id,title:event.title}))
    // console.log("Dataaa",eventList);
    return await eventList;
  }
  catch(error){
    console.log(`${url}/get/event`)
    console.error("Error in load Data",error);
  }
}