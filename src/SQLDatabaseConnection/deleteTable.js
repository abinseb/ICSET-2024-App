import { openDatabase } from "expo-sqlite";
const db = openDatabase('Event.db');

export const deleteOfflineTable =()=>{
    db.transaction((tx)=>{
        tx.executeSql('DELETE FROM offline_table;',
        [],(_,result)=>{
          if(result.rowsAffected >0){
            console.log('Deleted offline server');
          }
          else{
            console.log("No records")
          }
        }
        );
      });
  }