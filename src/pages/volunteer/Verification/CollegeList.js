import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { Group_list_load } from '../../../API_Communication/Load_data';
import { group_dataFrom_groupTable } from '../../../SQLDatabaseConnection/FetchDataFromTable';
const BulkVerification =({navigation})=>{

  const [items, setItems] = useState([]);

  useEffect(() => {
    groupList_load();
  }, []);

  const groupList_load = async () => {
      const group = await Group_list_load();
      if(group.data){
       const groupNames = group.data.institutions.map(item => ({ id: item.institution._id, name: item.institution.name }));
      console.log("names_____", groupNames);
      setItems(groupNames);
      }
      else{
        console.log("you are offline");
        const groupOffline = await group_dataFrom_groupTable();
        const groupNamesOffline = groupOffline.map(item => ({ id: item._id, name: item.name }));
        setItems(groupNamesOffline);
      }
   
  };

  const handlePassTheSelection = (selectedItem) => {
    console.log("Selected college:", selectedItem.id);
    const groupid = selectedItem.id;
    const groupname = selectedItem.name;
    console.log("idd",groupid);

   navigation.navigate('TopTab',{groupid,groupname})
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopTextView}>
        <Text style={styles.TextStyle}>Select the Institution from the List</Text>
      </View>
      <View style={styles.searchableDropDownContainer}>
        <SearchableDropDown 
          onTextChange={(text) => console.log(text)}
          onItemSelect={handlePassTheSelection}
          containerStyle={{ paddingTop: 50 }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            color: '#222',
          }}
          itemsContainerStyle={{
            maxHeight: '100%',
          }}
          items={items}
          defaultIndex={2}
          placeholder="Select a college"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
      </View>
    </SafeAreaView>
    )
}

export default BulkVerification;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#012E41',
        padding:10,
        justifyContent:'space-between'
    },
    TopTextView:{
      top:0,
      position:'absolute',
      paddingTop:'20%',
    alignSelf:'center',
    },
    TextStyle:{
      fontWeight:'300',
      fontSize:20,
      color:'#fff'
    },
    viewSearchableDropDown:{
      alignSelf:'center',
    
    },
    searchableDropDownContainer:{
      marginTop:'10%'
    }
})
