import { openDatabase } from "expo-sqlite";
const db = openDatabase('Event.db');

export const maximumTimeStampFetch=()=>{
        return new Promise((resolve, reject) => {
          try {
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT MAX(time) AS max_timestamp FROM user_table ;',
                [],
                (_, { rows }) => {
                    const data = rows._array
                    console.log("#######groupname",data);
                    resolve(data[0].max_timestamp);
                },
                (_, error) => {
                  reject(error); // Reject with the error if there's a SQL error
                }
              );
            });
          } catch (err) {
            console.error(err);
            reject(err); // Reject with the error if there's an exception
          }
        });
     
}