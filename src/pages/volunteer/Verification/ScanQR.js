import React, { useEffect, useRef, useState } from "react";
import {Text,View,StyleSheet,TouchableOpacity,ToastAndroid, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// import BarCodeScan from "../../../components/BarCodeScan";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { offline_verifiedUser_data } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { check_Offline_table_Count } from "../../../SQLDatabaseConnection/Fetch_Count_of_Table";
import { sync_OfflineData_verification } from "../../../API_Communication/Verification";
import { deleteOfflineTable } from "../../../SQLDatabaseConnection/deleteTable";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
const ScanQR=({navigation})=>{
    const [scanner,setScanner]= useState(false);

    const workshopName = useSelector((state)=>state.workshop.workshopName);
    

    const [offlineCount,setOfflineCount] = useState(0);

    const [refresh , setrefresh] = useState(false);

    // useEffect(()=>{
    //     offline_verified_count();
    //     setCapitalWorkshop(Capitalise(workshopName));
    // },[refresh])

    useFocusEffect(
        useCallback(()=>{
            offline_verified_count();
          
        },[refresh])
    )
   
    // workshop name capitalise to normal
function Capitalise(word) {
    return word.toUpperCase();
  }

  
    const handleQRCodeScan=()=>{
        setScanner(true);
        navigation.navigate("qrscanner");
    }

    const handleBackNavigation=()=>{
        navigation.goBack();
    }
    const navigationToVerify=()=>{
        navigation.navigate("Input Data");
    }

    // count of offline verified user data
const offline_verified_count=async()=>{
    const offlineCount = await check_Offline_table_Count();
        console.log("count",offlineCount);
        setOfflineCount(offlineCount);
     
}
    // sync offlin verified user data to the main db
    const syncOfflineToOnline=async()=>{
        const oflineverifiedData = await offline_verifiedUser_data();
        console.log("offline id ",oflineverifiedData);
        const syncdata = await sync_OfflineData_verification(oflineverifiedData);
        console.log("offlineData",syncdata);
        if(syncdata.data){
            if(syncdata.data.success === true){
                console.log("synced");
                await deleteOfflineTable();
                showToastNotificationOfSuccess();
               await setrefresh(!refresh);
    
            }
            
        }
        else{
            showToastNotificationFailer();
        }
    }

    // message of toast
    function showToastNotificationOfSuccess(){
        ToastAndroid.show("Synced",ToastAndroid.SHORT);
    }

    // message of fail
    function showToastNotificationFailer(){
        ToastAndroid.show("Syncing Failed",ToastAndroid.SHORT);
    }

    const navigationToProfile=()=>{
        navigation.navigate("Profile");
     }
     

    return(
        <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.profileImageView} onPress={navigationToProfile}>
                        <Image style={styles.profileImage} source={(require('./../../../images/settings.png'))} />
                        
                    </TouchableOpacity>
            <TouchableOpacity onPress={handleBackNavigation} style={styles.backNavigationTouchable}>
                <View style={styles.backNavigationView}>
                <FontAwesome5 name="less-than" size={16} color="white" />
                </View>
            </TouchableOpacity>
            
            <View style={styles.workshopNameView}>
                <Text style={styles.workshopText}>{'ICSET 2024'}</Text>
            </View>
               
            {/* {scanner ==true? */}
            {/* <BarCodeScan />  //barcode scanning 
             : */}
            <View style={styles.buttonViewBox}>
                <TouchableOpacity onPress={handleQRCodeScan}>
                    <View style={styles.innerButton}>
                        <Text style={styles.TextStyle}>Scan</Text>
                    </View>
                </TouchableOpacity>
            </View> 
            {/* } */}
            {offlineCount >0 &&(
            <View style={styles.syncButtonView}>
                <Button onPress={syncOfflineToOnline} textColor="#000" style={styles.syncButton}>sync</Button>

            </View>)}
            <View style={styles.textView}>
                <Text style={styles.txt1}>If QR won't Work?</Text>
                <TouchableOpacity onPress={navigationToVerify}>
                    <Text style={styles.txt2}>Click</Text>
                </TouchableOpacity>
               

            </View>
        </SafeAreaView>
    )
}

export default ScanQR;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#012E41',
        flex:1,
        justifyContent:"center"
    },
   
    profileImageView:{
        display:'flex',
      position:'absolute',
    //   marginTop:'14%',
      top:50,
      right:10,
      padding:2,
        borderRadius:20,
        // backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
     },
     profileImage:{
        padding:10,
        height:34,
        width:34,
        
     },
    buttonViewBox:{
        backgroundColor:'#44667B',
        height:280,
        width:280,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:150,
        alignItems:'center',
       

    },
    innerButton:{
        backgroundColor:'#6c95A7',
        height:230,
        width:230,
        borderRadius:150,
        justifyContent:'center',
        alignItems:'center',
    },
    TextStyle:{
        color:'#FFF',
        fontSize:26,
        fontWeight:'500'
    },
    textView:{
        alignSelf:'center',
        bottom:0,
        position:'absolute',
        flexDirection:'row',
        paddingBottom:20
    },
    txt1:{
        color:'#FFF',
        fontSize:16,
        fontWeight:'500'
    },
    txt2:{
        color:'#FFF',
        fontSize:16,
        fontWeight:'600',
        paddingLeft:4
    },
    backNavigationView:{
       
        height:40,
        width:40,
        // backgroundColor:'white',
        borderRadius:22,
        // margin:10,
        // marginTop:40,
        alignItems:'center',
        justifyContent:'center',

    },
    backNavigationTouchable:{
        top:0,
        position:'absolute',
        marginTop:'14%',
        marginLeft:'3%',
        
    },

    workshopNameView:{
        top:'15%',
        position:'absolute',
        alignSelf:'center',
        alignItems:'center'
    },
    workshopText:{
        fontSize:30,
        fontWeight:'500',
        color:'#ffffff'
    },
    syncButtonView:{
        paddingTop:'10%',
        alignSelf:'center',
        alignItems:'center',
        

    },
    syncButton:{
        backgroundColor:'#ffff',
        
    }


})