import { openDatabase } from "expo-sqlite";
const db = openDatabase('Event.db');

export const deleteAllTables = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS user_table;');
        tx.executeSql('DROP TABLE IF EXISTS offline_table;');
        tx.executeSql('DROP TABLE IF EXISTS group_table;');
      },
      (error) => {
        console.error('Error executing deleteAllTables transaction:', error);
      },
      () => {
        console.log('All tables deleted successfully.');
      }
    );
  };
  


// 