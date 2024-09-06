import React, { useEffect } from "react";
import MyStack from "./src/navigation/StackNavigation";
import { Provider } from "react-redux";
import store from "./src/redux";

import { enableScreens } from "react-native-screens";

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { dataFetchbasedOnTimeStamp } from "./src/API_Communication/BackgroundSync";


TaskManager.defineTask('defaultRun', async()=>{

});


enableScreens();
export default function App() {
  // initial rendering
// useEffect(()=>{
//   loadDataFromServerAndInsert();
 
// },[])
const loadDataFromServerAndInsert=async()=>{
 try{
  //  await Create_Event_Data_Table();
  //  await insertEventTable();
  // await Create_Workshops_Table();
  //  await insertWorkshopTable();
  //  await Create_user_table();
  // await insert_To_UserTable();
  // await Data_for_Update_UserTable();
  // await create_Offline_table();
  // await create__group_table();
  // await insert_group_table();
 }
 catch(err){
  console.log(err);
 }
}


// useEffect(()=>{
// const timerId = setInterval(()=>{
//   dataFetchbasedOnTimeStamp();
//   console.log("update table");
// },10*1000);

// return()=>{
//   clearInterval(timerId);
// };
// },[]);




  return (
 
<Provider store={store}>
<MyStack></MyStack>
</Provider>

  );
}


