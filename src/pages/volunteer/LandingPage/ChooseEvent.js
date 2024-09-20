import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image , Alert ,BackHandler} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';

import {  getUserData, saveEventId } from "../../../AsyncStorage/StoreUserCredentials";

import { event_Data_Get, user_data_load } from "../../../API_Communication/Load_data";
import { tableList } from "../../../SQLDatabaseConnection/Create_Table";
import { insert_To_UserTable, insert_group_table } from "../../../SQLDatabaseConnection/Insert_Table";
import { SafeAreaView } from "react-native-safe-area-context";

const ChooseEvent = ({navigation}) => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
   const event_data_fetch = async () => {
     const response = await event_Data_Get();
     console.log("response",response);
     if(response.data){
      const transformdata = await response.data.events.map(event => ({
        key: event._id,
        value: event.location,
        disabled: false,
      }));
      setEventList(transformdata);
     }
   }
   event_data_fetch();
   tableList();
  }, []);

  

  const EntryCheck=async()=>{
      console.log("hello");
      const {username ,token} =await getUserData();
      console.log("display status",username,token);
    }



  const handleSelectEvent =async (val) => {
    await saveEventId(val);
    await getMasterData_And_InsertToLoacal(val);
   await navigationToNext('bottomTab');

  };

  const navigationToNext=(path)=>{
    navigation.navigate(path);
  }

 
  // insert master data to lacal db
  const getMasterData_And_InsertToLoacal =async(eventid)=>{
    try{
        await Promise.all([
         // await user_data_load(eventid),
         await insert_To_UserTable(),
         await insert_group_table()
        ])
    }
    catch(error){
        console.error('Error in user data saving',error);
    }

  }
  // avoid backnvigation
//   const handleBacknavigation = () => {
//     Alert.alert(
//         "Exit App",
//         "Do you want to exit?",
//         [
//             {
//                 text: "No",
//                 onPress: () => {
//                     navigation.navigate("entrypage");
//                 },
//                 style: 'cancel'
//             },
//             {
//                 text: "Yes",
//                 onPress: () => {
//                     BackHandler.exitApp();
//                 }
//             }
//         ],
//         { cancelable: false }
//     );
//     return true;
// };

// useEffect(() => {
//     const backhandler = BackHandler.addEventListener(
//         "hardwareBackPress",
//         handleBacknavigation
//     );
//     return () => {
//         backhandler.remove();
//     }
// }, [navigation]);



  return (
   <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.image_View}>
        <Image style={styles.image_style} source={require('../../../images/LOGO_ICTAK-ENG-ALT-White-Text.png')} />
      </View>
      <View style={styles.dropDownListContainer}>
        <Text style={styles.textTop}>Select the Zone</Text>
        <SelectList
          setSelected={(val)=>handleSelectEvent(val)}
          data={eventList}
          // save="key"
          searchicon={<EvilIcons name="search" size={24} color="white" />}
          inputStyles={{ color: '#fff' }}
          boxStyles={{ borderWidth: 1, borderColor: '#fff' }}
          dropdownTextStyles={{ color: '#ffff' }}
          closeicon={<Entypo name="cross" size={24} color="white" />}
          arrowicon={<AntDesign name="down" size={24} color="white" />}
          searchPlaceholder={null}
          // onSelect={()=>handleSelectEvent(selected)}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}

export default ChooseEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#012E41',
  },
  image_View: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.4
  },
  image_style: {
    height: 80,
    width: 250
  },
  dropDownListContainer: {
    flex: 0.6,
    alignSelf: 'center',
    width: '100%',
    padding: 10
  },
  textTop: {
    color: '#fff',
    alignSelf: 'flex-start',
    paddingBottom: 6
  }
});
