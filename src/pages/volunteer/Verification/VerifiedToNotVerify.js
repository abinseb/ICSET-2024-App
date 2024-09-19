import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity,ToastAndroid,ActivityIndicator} from "react-native";
import { Card} from "react-native-paper";
import { useSelector } from "react-redux";
import { List_userbasedOn_group, list_verifiedUserData_basedOngroup } from "../../../API_Communication/Load_data";
import { Verified_user_data_basedON_group } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { unverify_user, userVerification } from "../../../API_Communication/Verification";
import { unverification_Offline, userVerification_Offline } from "../../../SQLDatabaseConnection/Update_Table";
import { useFocusEffect } from "@react-navigation/native";
import BoxText from "../../../components/BoxText";

const VerifiedToNotVerify = ({route,navigation}) => {

 const { groupid,groupname } = route.params;
 // workshopname from redux
//  const workshopname = useSelector((state) => state.workshop.workshopName);
// const workshopname = useSelector('Google Workshop');
//  token 
// const token = useSelector((state) => state.auth.token);
const token ='edee';

 const [userdata,setUserData] = useState([]);

 const [refresh, setRefresh] = useState(false);
 const [loading , setLoading]  = useState(false);
 
useFocusEffect(
    React.useCallback(()=>{
        verifiedUserData();
    },[refresh])
)


const verifiedUserData=async()=>{
    setLoading(true)
        const verifiedData = await List_userbasedOn_group(groupid,true);
    console.log("verified_data_______#####",verifiedData);
    if(verifiedData.data){
        setUserData(verifiedData.data.data|| []);
        setLoading(false);
    }
    else{
        console.error("errorrrr_____________");
        const verifiedTableData = await Verified_user_data_basedON_group(groupid,true);
        console.log("verified-------------->>>>>>")
        setUserData(verifiedTableData || []);
        setLoading(false);
    }

}

// unverify the user data
//const verification = await userVerification(true,id);
// console.log("verificationstatus----------------",verification.data);
//  if(verification.data){
//      if(verification.data.success === true ){
//      await setIsChecked(updatedCheckedState);
//      setRefresh(!refresh);
   
// }
const unverify_user_inGroup=async(userid)=>{
    
        const unverify = await userVerification(false,userid);
        console.log("unverify",unverify);
        if(unverify.data){
            if(unverify.data.success === true){
                setRefresh(!refresh);
                ToastAndroid.show('UnVerified', ToastAndroid.SHORT);
            }
            // else if(unverify === 403 ){
            //     alert("Your session has expired due to inactivity. Please log out and log back in to continue using the application.");
            //     navigationToprofile();
            // }
            else{
               //alert("UnVerification Failed");
               ToastAndroid.show('UnVerification Failed', ToastAndroid.SHORT);
            }
        }
    else{
        await userVerification_Offline(userid,false);
        await setRefresh(!refresh);
    }
   
       
    
}

// navigation To profile for logout
const navigationToprofile=()=>{
    navigation.navigate('Profile');
}

    return (
        <SafeAreaView style={styles.container}>
            {userdata.length == 0 ?
            <>
            {
                loading === true ?
                <ActivityIndicator size="large" color="#0000ff" />
                 :
                <BoxText message='No User Verified' />
            }
            </>
               
                :
            <View style={styles.innerBox}>
                <View style={styles.TittleView}>
                    <Text style={styles.tittleText}>{groupname}</Text>
                </View>
                
               
                
                <ScrollView contentContainerStyle={styles.cardView}  >
                    {userdata.map((value, index) => (
                         
                            <Card style={styles.cardStyle} key={index}>
                                <Card.Content style={styles.cardContentStyle}>
                                    <Image style={styles.imageStyle} source={require('../../../images/user4.png')}></Image>
                                    <Text style={styles.nameText}>{value.firstName +' '+value.lastName}</Text>
                                    <View style={styles.textView}>
                                        <Text style={styles.txt1}> {value.email}</Text>
                                        <Text style={styles.txt1}> {value.mobile}</Text>
                                        <Text style={styles.workshopTxt}>{'Google Workshop'}</Text>
                                        <Text style={styles.verifiedTxt}>Verified</Text>
                                    </View>
                                    <View style={styles.viewCheckBox}>
                                        <TouchableOpacity onPress={()=>{unverify_user_inGroup(value.registrationId || value._id)}}>
                                            <Image source={require('../../../images/cross.jpg')} style={{ height: 17, width: 17 }} />
                                        </TouchableOpacity>
                                    </View>
                                </Card.Content>
                            </Card>
                    ))}
                </ScrollView>

            </View>
            }
        </SafeAreaView>
    )
}

export default VerifiedToNotVerify;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#012E41",
        flex: 1,
        justifyContent: 'center',
    },
    innerBox: {
        alignSelf: 'center',
        backgroundColor: '#BAD0DE',
        height: '97%',
        width: '95%',
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    TittleView: {
        margin: '10%',
        alignSelf: 'center',
    },
    tittleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#343F45'
    },
    cardView: {

        alignItems: "center",
        // height:'100%',

        // backgroundColor:'#ffff'
    },
    cardStyle: {
        height: 130,
        width: '95%',
        backgroundColor: '#ffff',
        marginBottom: 10,

    },
    cardContentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    imageStyle: {
        height: 60,
        width: 60,
    },
    nameText: {
        margin: 10,
        marginLeft: '32%',
        top: 0,
        position: 'absolute',
        fontSize: 16,
        fontWeight: '500',
    },
    textView: {
        alignItems: 'flex-start',
        paddingTop: '5%',
        marginLeft: '5%',
        width: '65%'
    },
    txt1: {
        color: ''
    },
    workshopTxt: {
        color: '#0475FA',
        alignSelf: 'flex-start',
    },
    viewCheckBox: {
        alignSelf: 'center'
    },
    verifiedTxt: {
        color: '#2e8b57',
        alignSelf: 'start',
        fontSize: 14,
        paddingTop:2
    }

})