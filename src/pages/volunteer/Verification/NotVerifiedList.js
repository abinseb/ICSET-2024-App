import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text, Image, ScrollView ,ToastAndroid ,ActivityIndicator} from "react-native";
import { Button, Card, Checkbox } from "react-native-paper";
import { List_userbasedOn_group } from "../../../API_Communication/Load_data";
import { useSelector } from "react-redux";
import { userBulkVerification } from "../../../API_Communication/Verification";
import { Verified_user_data_basedON_group } from "../../../SQLDatabaseConnection/FetchDataFromTable";
import { offlineBulkVerification } from "../../../SQLDatabaseConnection/Update_Table";
import { useFocusEffect } from "@react-navigation/native";
import BoxText from "../../../components/BoxText";
const NotVerifiedToVerify = ({ route,navigation }) => {
  // group id
  const { groupid,groupname } = route.params;
  // workshopname from redux
  const workshopname = useSelector((state) => state.workshop.workshopName);

  // userlist
  const [userList, setUserList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [selectedUserId , setSelectedUserId] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [loading , setLoading ] = useState(false);

  // token
  // token
const token = useSelector((state) => state.auth.token);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch and update data here
      listOfUser_inGroup();
    }, [refresh])
  );

  const listOfUser_inGroup = async () => {
    setLoading(true);
    setSelectedUserId([]);
      const userData = await List_userbasedOn_group(groupid,false);
      if(userData.data){
        userData.data.data.sort((a, b) => {
          return a.firstName.localeCompare(b.firstName);
        })
        setUserList(userData.data.data || []);
         setIsChecked(userData.data.data.map(() => false));
         setLoading(false);
      }
      else{
        alert("offline");
      const tableData = await Verified_user_data_basedON_group(groupid, false);
      console.log("User data from table:", tableData);
       if(tableData === null){
        setLoading(false);
        setUserList([]);
       }
       else{
        setUserList(tableData || []);
        setIsChecked(tableData.map(() => false));
        setLoading(false);
       }
      }
  };
  

  const handleCheckboxPressed = async (id, index) => {
    const updatedCheckedState = [...isChecked];
    updatedCheckedState[index] = !updatedCheckedState[index];
    setIsChecked(updatedCheckedState);
    console.log(updatedCheckedState[index],"------------------")
    if(updatedCheckedState[index]){
      setSelectedUserId((prevSelected) => [...prevSelected, id]);
    console.log("Selected user ID added:", selectedUserId);
    }
    else{
      setSelectedUserId((prevSelected) => prevSelected.filter((userId) => userId !== id));
    console.log("Selected user ID removed:", selectedUserId);
    }
    
  };

  const handleVerification=async()=>{
    const verifyBulk = await userBulkVerification(selectedUserId);
    console.log("bulkverification---",verifyBulk);
    if(verifyBulk.data){
      if(verifyBulk.data.success === true ){
        ToastAndroid.show('Verified', ToastAndroid.SHORT);
        setRefresh(!refresh);
      }
    }
    else{
      console.log("bulkverification---offline---");
      offlineBulkVerification(selectedUserId,true);
      ToastAndroid.show('Offline Verified', ToastAndroid.SHORT);
      setRefresh(!refresh);
    }
  }

 

  return (
    <SafeAreaView style={styles.container}>
      {userList.length === 0 ? 
      <>
     {loading === true ?
         <ActivityIndicator size="large" color="#0000ff" />
       :  
       <BoxText message='All Verified' />
      }
      </>
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
                  <Text style={styles.nameText}>
                    {(value?.firstName ? value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1).toLowerCase() : '') + ' ' + 
                    (value?.lastName ? value.lastName.charAt(0).toUpperCase() + value.lastName.slice(1).toLowerCase() : '')}
                  </Text>

                  <View style={styles.textView}>
                    <Text style={styles.txt1}> {value.email}</Text>
                    <Text style={styles.txt1}> {value.mobile}</Text>
                    {/* <Text style={styles.workshopTxt}>{'Google Workshop'}</Text> */}
                  </View>
                  <View style={styles.viewCheckBox}>
                    <Checkbox
                      status={isChecked[index] ? "checked" : "unchecked"}
                      onPress={() => {
                        handleCheckboxPressed(value.registrationId || value._id , index);
                      }}
                      color="#2e8b57"
                    />
                  </View>
                </Card.Content>
              </Card>
          ))}
        </ScrollView>
       {
        selectedUserId.length > 0 &&
        <Button onPress={handleVerification} mode="contained" style={styles.buttonStyle}>Verify</Button>
       }
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
    height: 'auto',
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
  buttonStyle: {
    marginTop:5,
    marginBottom:10,
     width:140,
    backgroundColor:'#012E41',
    alignSelf:'center',
    color:'#ffff',
  }
});
