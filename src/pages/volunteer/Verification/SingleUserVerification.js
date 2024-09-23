import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet,Image,Text,TouchableOpacity,ToastAndroid ,BackHandler} from 'react-native';
import { SafeAreaView,SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons,Ionicons,FontAwesome5,AntDesign } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import { user_data_based_on_id } from "../../../API_Communication/Load_data";
import { useSelector } from "react-redux";
import { groupName_from_id, userDetailsBasedOnIDFromTable } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { userVerification } from "../../../API_Communication/Verification";
import { userVerification_Offline } from "../../../SQLDatabaseConnection/Update_Table";
const SingleUserVerification = ({route,navigation}) => {
  // params passing during navigation
  const {qrdata} = route.params;
  // workshopname fetch from redux
  const workshopname = useSelector((state)=>state.workshop.workshopName);
  // userdata store in a useState array
  const [user,setUser] = useState({});
// token
const token = useSelector((state) => state.auth.token);

const [orgname, setOrgname] = useState('');
// group name
const [groupname,setGroupname] = useState('');
  // back navigation to scan
  const navigationToScan=(screename)=>{
    navigation.navigate(screename);
  }

  // workshopname
  const[worshopNamecapital,setWorkshopNamecapital] = useState('');

  const workshopValue = useRef('');

  useEffect(()=>{
    // setWorkshopNamecapital(Capitalise(workshopname));
     userDataFetch();
  },[])
  // to capitalise
  function Capitalise(word) {
    return word.toUpperCase();
  }

  // fetch the user data based on id
  const userDataFetch=async()=>{
      const userData = await user_data_based_on_id(qrdata);
      console.log("userdataaa---------------",userData.data);
     if(userData.data){
       if(userData.data.success === true){
        setUser(userData.data.eventEntry);
        if(userData.data.eventEntry.type === 1){
          setOrgname(userData.data.eventEntry.institutionId.name);
        }
       }
       if(userData.data.success === false){
        alert(userData.data.message);
        navigationToScan('ScanQRCode');
     }
    }
     else{
      ToastAndroid.show("You are Offline", ToastAndroid.SHORT);
      const offlinedata = await userDetailsBasedOnIDFromTable(qrdata);
      console.log("offlinedata###########",offlinedata[0]);
          
        // if(Number(offlinedata[0][workshopname]) != 0){
        //   workshopValue.current= (Number(offlinedata[0][workshopname]));
        if(offlinedata[0] === undefined){
          alert('User Not Registered');
          navigationToScan('ScanQRCode');
        }
        else{
          setUser(offlinedata[0]);
          setOrgname(offlinedata[0].organization);
          
          
        }
         
          // const groupdataname = await groupName_from_id(offlinedata[0].groupid);
          // setGroupname(groupdataname);
          
        
          // }

          // else{
          //   alert("User Not Registered");
          //   navigationToScan();
          // }
     }
  }


function showToastNotificationverification() {
  ToastAndroid.show("Verified", ToastAndroid.SHORT);
}
//
  // verification of user based on the workshop
  const handleVerification=async()=>{
   
    const verifyUser = await userVerification(true,qrdata);
    console.log("verfiyUser",verifyUser.data);
    if(verifyUser.data){
      if(verifyUser.data.success === true){
        ToastAndroid.show(verifyUser.data.message, ToastAndroid.SHORT);
        navigationToScan("ScanQRCode")
      }
    }
    else{
        // alert("Offline");
       userVerification_Offline(qrdata,true);
       navigationToScan(screen='ScanQRCode');
    }

    
  }

  // avoid backnavigation

useEffect(()=>{
  const handleBackPress =()=>{
    navigationToScan(screen='ScanQRCode');
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleBackPress
  );

  return ()=>{
    backHandler.remove();
  };

},[]);
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
        
          <TouchableOpacity onPress={()=>{navigationToScan(screen = 'ScanQRCode')}} style={styles.touchable} >
            <View style={styles.backNavigationView}>
              <FontAwesome5 name="less-than" size={20} color="white" />
            </View>
          </TouchableOpacity>
               
     
        
        <View style={styles.innerBox}>
            {/* Content for innerBox */}
        </View>
        <View style={styles.innerBox2}>
            {/* Content for innerBox2 */}
        </View>
        
        <View style={styles.profileBox}>
            <View style={styles.profileImageView}>
                <Image style={styles.profileImage} source={(require('./../../../images/user.png'))} />
            </View>
            <View style={styles.nameTextTopView}>
            {/* <Text style={styles.nameText}>
              {(user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() : '') + ' ' + 
              (user?.lastName ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase() : '')}
            </Text> */}
             <Text style={styles.nameText}>{user.firstName.toUpperCase()+' '+user.lastName.toUpperCase()} </Text>


                <Text style={styles.institusionText}>{orgname}</Text>
            </View> 
           {/* <View style={{alignSelf:'center',alignItems:'center',paddingTop:20}}>
           <Text style={styles.workshopNameStyle}>{user.event_id.location}</Text>
           </View> */}
            <View style={styles.tittleDetails}>
                <Text style={styles.TittleText}>Participant Details</Text>
            </View>
            <View style={styles.otherDetailsView}>
                <View style={styles.iconDataView}>
                <AntDesign name="idcard" size={20} color="black" />
                      <Text style={styles.dataStyle}>{qrdata}</Text>
                      
                  </View>
                <View style={styles.iconDataView}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="black" />
                    <Text style={styles.dataStyle}>{user.email}</Text>
                </View>
                <View style={styles.iconDataView}>
                <Ionicons name="call-outline" size={20} color="black" />
                    <Text style={styles.dataStyle}>{user.mobile}</Text>
                </View>
                
            </View>
            {user.attendanceStatus === true || user.attendanceStatus === 1 ?
                 <View style={styles.buttonView}>
                  <Text style={{color:'#228b22',alignSelf:'center',fontSize:20}}>Verified</Text>
                  <Button mode="contained" onPress={()=>{navigationToScan('ScanQRCode')}} style={styles.customButtonBackToHome}>Back To Home</Button>

                  </View>
            :
            <View style={styles.buttonView}>
                <Button mode="contained" onPress={handleVerification} style={styles.customButton}>Verify</Button>

            </View>
         
            }

        </View> 
      
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

export default SingleUserVerification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#012E41',
    justifyContent:'center',
    flex: 1,
  },
  innerBox: {
    backgroundColor: '#fff',
    height:'65%',
    width: '100%',
    borderLeftWidth: 70,
    borderTopLeftRadius: 400,
    position:'absolute',
    bottom:0,
    right:0,
    borderLeftColor: 'transparent',

  },
  innerBox2: {
    backgroundColor: '#fff',
    height: '40%',
    width: '20%', // Adjust the width as needed
    position: 'absolute', // Absolute positioning
    bottom: 0, // Align at the bottom
    left: 0, // Align at the left
    borderTopRightRadius:80,
  },
  profileBox:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    backgroundColor:'#fff',
    height:'65%',
    width:'85%',
    alignSelf:'center',
    borderRadius:30,
    // borderWidth:1,
    elevation:5
  },
  profileImageView:{
    paddingTop:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  profileImage:{
    height:80,
    width:80,
  },
  
  nameTextTopView:{
    alignItems:'center',
    paddingTop:'5%'

  },
  nameText:{
    fontWeight:'600',
    fontSize:22,
    
  },
  institusionText:{
    color:'#969595',
    fontSize:13,
    fontWeight:'600',
    paddingTop:10,
  },
  tittleDetails:{
    alignItems:'center',
    paddingTop:'5%'
  },
  
  otherDetailsView:{
    alignItems:'flex-start',
    paddingTop:10,
   
  },
  TittleText:{
    fontSize:16,
    fontWeight:'600'
  },
  iconDataView:{
    paddingLeft:'10%',
    flexDirection:'row',
    alignItems:'center',
    margin:10
  },
  dataStyle:{
    fontSize:17,
    fontWeight:'300',
    paddingLeft:10
  },
  buttonView:{
    alignSelf:'center',
    paddingTop:10
  },
  customButton:{
    width:170,
    backgroundColor:'#012E41'
  },

  backNavigationView:{
    
    height:40,
    width:40,
    borderRadius:22,
    margin:'10%',
    alignItems:'center',
    justifyContent:'center',
},

touchable:{
  top:0,
  position:'absolute',
},
workshopNameStyle:{
fontWeight:'900',
fontSize:20,
},
customButtonBackToHome:{
  width:170,
  backgroundColor:'#008000'
},
});
