import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Image, ScrollView ,ToastAndroid} from "react-native";
import { Card, Checkbox } from "react-native-paper";
import { List_userbasedOn_group } from "../../../API_Communication/Load_data";
import { useSelector } from "react-redux";
import { userVerification } from "../../../API_Communication/Verification";
import { user_Table_data, user_data_basedON_group } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { userVerification_Offline } from "../../../SQLDatabaseConnection/Update_Table";
import { useFocusEffect } from "@react-navigation/native";
import BoxText from "../../../components/BoxText";
const NotVerifiedToVerify = ({ route,navigation }) => {
  // group id
  const { groupid,groupname } = route.params;
  // workshopname from redux
  const workshopname = useSelector((state) => state.workshop.workshopName);

  // userlist
  const [userList, setUserList] = useState([
    {
      _id: 0,
      name: 'Srikanth',
      email: 'srikanth@123',
      mobile: '1234567890',
      
  },{
      _id: 1,
      name: 'Srikanth',
      email: 'srikanth@123',
      mobile: '1234567890',
  }
  ,{
      _id: 2,
      name: 'Srikanth',
      email: 'srikanth@123',
      mobile: '1234567890',
  },{
      _id: 3,
      name: 'Srikanth',
      email: 'srikanth@123',
      mobile: '1234567890',
  }
  ]);
  const [isChecked, setIsChecked] = useState([]);

  const [refresh, setRefresh] = useState(false);

  // token
  // token
const token = useSelector((state) => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch and update data here
      // listOfUser_inGroup();
    }, [refresh])
  );

  const listOfUser_inGroup = async () => {
    try {
      const userData = await List_userbasedOn_group(groupid, workshopname);
      setUserList(userData || []);
      setIsChecked(userData.map(() => false));
    } catch (error) {
      console.log("Error fetching user data:", error);
      const tableData = await user_data_basedON_group(groupid, workshopname);
      console.log("User data from table:", tableData);
       setUserList(tableData || []);
      setIsChecked(tableData.map(() => false));
    }
  };
  

  const handleCheckboxPressed = async (id, index) => {
    try{
    // Toggle checkbox state
    console.log("token____________",token);
    const updatedCheckedState =await [...isChecked];
    updatedCheckedState[index] =await !updatedCheckedState[index];
     const verification = await userVerification(id,workshopname,token);
     console.log("verificationstatus",verification);
     if(verification === true ){
        await setIsChecked(updatedCheckedState);
        setRefresh(!refresh);
        
     }
     else if(verification === 403 ){
      alert("Your session has expired due to inactivity. Please log out and log back in to continue using the application")
      navigationToprofile();
         }
     else{
      alert("verification failedd");
     }
    }
    catch(error){
      console.log("Verification error",error);
      //console.log("iidddd",id);
      const updatedCheckedState =await [...isChecked];
      await userVerification_Offline(id,workshopname);
      await setIsChecked(updatedCheckedState);
      setRefresh(!refresh);
    }
    
  };

// notification alert
function showToastNotificationverification() {
  ToastAndroid.show("Verified", ToastAndroid.SHORT);
}
  // navigation to logout
  const navigationToprofile=()=>{
    navigation.navigate('Profile');
  }
 

  return (
    <SafeAreaView style={styles.container}>
      {userList.length == 0 ? 
      <BoxText message='All Verified' />
      :
      <View style={styles.innerBox}>
        <View style={styles.TittleView}>
          <Text style={styles.tittleText}>{groupname} </Text>
        </View>
        <ScrollView contentContainerStyle={styles.cardView}>
          {userList.map((value, index) => (
            
              <Card style={styles.cardStyle} key={index}>
                <Card.Content style={styles.cardContentStyle}>
                  <Image style={styles.imageStyle} source={require("../../../images/user2.png")} />
                  <Text style={styles.nameText}>{value.name}</Text>
                  <View style={styles.textView}>
                    <Text style={styles.txt1}> {value.email}</Text>
                    <Text style={styles.txt1}> {value.mobile}</Text>
                    <Text style={styles.workshopTxt}>{'Google Workshop'}</Text>
                  </View>
                  <View style={styles.viewCheckBox}>
                    <Checkbox
                      status={isChecked[index] ? "checked" : "unchecked"}
                      onPress={() => {
                        handleCheckboxPressed(value._id || value.id, index);
                      }}
                      color="#2e8b57"
                    />
                  </View>
                </Card.Content>
              </Card>
          ))}
        </ScrollView>
        <View style={styles.buttonView}></View>
      </View>
      }
    </SafeAreaView>
  );
};

export default NotVerifiedToVerify;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#012E41",
    flex: 1,
    justifyContent: "center",
  },
  innerBox: {
    alignSelf: "center",
    backgroundColor: "#BAD0DE",
    height: "97%",
    width: "95%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  TittleView: {
    margin: "10%",
    alignSelf: "center",
  },
  tittleText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#343F45",
  },
  cardView: {
    alignItems: "center",
    paddingBottom: "30%",
  },
  cardStyle: {
    height: 110,
    width: "95%",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  cardContentStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageStyle: {
    height: 60,
    width: 60,
  },
  nameText: {
    margin: 10,
    marginLeft: "32%",
    top: 0,
    position: "absolute",
    fontSize: 16,
    fontWeight: "500",
  },
  textView: {
    alignItems: "flex-start",
    paddingTop: "5%",
    marginLeft: "5%",
    width: "65%",
  },
  txt1: {
    color: "",
  },
  workshopTxt: {
    color: "#0475FA",
    alignSelf: "flex-start",
  },
  viewCheckBox: {
    alignSelf: "center",
  },
});
