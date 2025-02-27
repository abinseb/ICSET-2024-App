import React, { useRef, useState } from "react";
import { View , Text,StyleSheet ,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { fetchThe_userId } from "../../../API_Communication/Load_data";
import { fetch_The_id_From_UserTable } from "../../../SQLDatabaseConnection/FetchDataFromTable";
const Input_data=({navigation})=>{

    const qrdata = useRef('');

    const [userName,setUserName] = useState('');
    
    const handleCheckTheId=async()=>{
       
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Regular expression for mobile number validation
            const mobileRegex = /^\d{10}$/;
            
            console.log("userInput",userName.length);
            // if(emailRegex.test(userName) || mobileRegex.test(userName)){
                const userData = await fetchThe_userId(userName);
                console.log("userId fetched-----",userData.data);
                if(userData.data){
                    if(userData.data.success === true){
                    qrdata.current = userData.data.data.registrationId;
                    console.log("userId data",qrdata.current);
                    navigation.navigate("singleUserVerify",{qrdata:qrdata.current});
                    }
                    else{
                        alert("User not found");
                    }
                }
                else{
                    const userid = await fetch_The_id_From_UserTable(userName);
                    console.log("userrrrr-----------------------------------------",userid);
                    if(userid === undefined){
                        alert("User not found");
                    }
                    else{
                    qrdata.current = userid[0]._id
                    navigation.navigate("singleUserVerify",{qrdata:qrdata.current});
                    }
                }
        
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.box_container}>
                <Text style={{color:'#fff'}}>Id / Mobile Number /email id </Text>
                <TextInput 
                    style={styles.styleInputText}
                    value={userName}
                    onChangeText={(value)=>setUserName(value)}
                //  placeholder="Id or Mobile Number"
                />

                <Button textColor="#000" 
                style={styles.buttonCheck} mode="contained" onPress={handleCheckTheId}>Check</Button>

            </View>

        </SafeAreaView>
    )
}

export default Input_data;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#012E41',
        flex:1,
        justifyContent:'center'
    },
    box_container:{
        backgroundColor:'#012E41',
        
        alignSelf:'center',
        borderRadius:15,
        height:'40%',
        width:'100%',
        alignItems:'flex-start',
        flexDirection:'column',
        marginLeft:20
    },
    styleInputText:{
        borderColor: "#ffff",
        borderBottomWidth: 1,
        height: 40,
        width: "85%",
        backgroundColor: "#012E41", // Set the background color to the container color
        color: "#ffff",
    },
    buttonCheck:{
        marginTop:50,
        marginLeft:20,
        alignSelf:'start',
        width:'30%',
        backgroundColor:'#ffff'
    }

})