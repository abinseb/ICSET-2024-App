import React from "react";
import {View,Text,StyleSheet,Image,BackHandler,Platform} from 'react-native';
import { List, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../redux/Actions";
import { deleteAllTables } from "../../../SQLDatabaseConnection/Drop_table";
import { removeEventId, removeUserData } from "../../../AsyncStorage/StoreUserCredentials";
const VolunteerProfile=()=>{
const dispatch = useDispatch();

    const log_Out_fromDevice=async()=>{
        try{
            await removeUserData();
            await removeEventId();
            await dispatch(logoutSuccess());
            await deleteAllTables();
            await exit_App();

        }
        catch(errr){
            console.log("Error in logout",errr);
        }
    }
    const exit_App=()=>{
        BackHandler.exitApp();
    }
    return(
       <SafeAreaView style={styles.container}>
        <View style={styles.profileTittle}>
            <Text style={styles.profile_txt}>Profile</Text>
        </View>
        <View style={styles.profileImageView}>
            <Image style={styles.imageStyle} source={require('../../../images/icon2.png')} />
            <Text style={styles.nameText}>Vimal Prakash</Text>
        </View>
        <View style={styles.listView}>
            <List.Section>
                {/* <List.Subheader>Profile</List.Subheader> */}
                <List.Item 
                    title="Profile"
                    titleStyle={{ color: '#ffff' }}
                    left={()=><List.Icon icon="account" color="#fff"  size={40}/>}
                    color="#fff"
                    style={styles.listItem}
                    onPress={()=>{

                    }}
                    
                />
                <List.Item 
                    title="Change Password"
                    titleStyle={{ color: '#ffff' }}
                    left={()=><List.Icon icon="key" color="#ffffff" size={40} />}
                    color="#fff"
                    style={styles.listItem}
                    onPress={()=>{

                    }}
                    
                />
                <List.Item 
                    title="Logout"
                    titleStyle={{ color: '#ffff' }}
                    left={()=><Avatar.Icon
                    icon="logout"
                    color="white"
                    style={{
                        backgroundColor:'#012E41'
                    }}
                    size={40} />
                    }
                    color="#fff"
                    style={styles.listItem}
                    onPress={log_Out_fromDevice}
                    
                />

               
            </List.Section>
        </View>
       </SafeAreaView>
    )
}

export default VolunteerProfile;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#012E41',
        flex:1,
    },
    profileTittle:{
        alignSelf:'flex-start',
        margin:20,
    },
    profile_txt:{
        color:'#ffffff',
        fontSize:30,
        fontWeight:'500'
    },
    profileImageView:{
        alignSelf:'center',

    },
    imageStyle:{
        height:120,
        width:120
    },
    nameText:{
        fontSize:20,
        color:'#fff',
        fontWeight:'300'
    },
    listView:{

    },
    listItem:{
        // backgroundColor:'#fff',
        color:'#ffffff',
        marginVertical:5,
        marginLeft:10,
        borderBottomWidth:1,
        borderBottomColor:'#fff'
        
    }

})