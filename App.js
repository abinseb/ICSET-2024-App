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


