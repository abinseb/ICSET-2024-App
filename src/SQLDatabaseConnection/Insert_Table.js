import { openDatabase } from "expo-sqlite";
import { Group_list_load, event_Data_Load, user_data_load, workshop_data_load } from "../API_Communication/Load_data";
const db = openDatabase('Event.db');

// insert to user table
export const insert_To_UserTable=async()=>{

    try{
        const userData = await user_data_load();

        console.log("user data------------------------>>>>>",userData.length);
        
        await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                userData.forEach((user) => {
                    tx.executeSql(
                        'INSERT INTO user_table (_id,firstName,lastName,mobile,email,groupid,type,time,organization,attendanceStatus) VALUES (?,?,?,?,?,?,?,?,?,?);',
                        [
                            user.registrationId,
                            user.firstName,
                            user.lastName,
                            user.mobile.toString(),
                            user.email,
                            user.institutionId._id,
                            user.type,
                            user.time || 0,
                            'College of Vadakara',
                            user.attendanceStatus || false
                        ],
                        () => {
                            console.log("-----inserted into userTable--------");
                            resolve();
                        },
                        (error) => {
                            console.error("Error in inserting_user_table", error);
                            reject(error);
                        }
                    );
                });
            });
        });
        

    }
    catch(err){
        console.log("error--in inserting----",err);
    }
}

// offline data insert

export const offline_dataInsert=(userid,workshop)=>{
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO offline_table (_id) VALUES (?);',
                [userid],
                ()=>console.log("Insert id and workshop offlinetble"),
                (error)=> console.error("Error in insertion",error)
            )
        })
    }
    catch(error){
    console.log("Error in inserting offline ",error)
    }
}

// insert data into group table
export const insert_group_table=async()=>{
    try{
        const groupData = await Group_list_load();

       await db.transaction((tx)=>{
           groupData.forEach((group)=>{
            tx.executeSql(
                'INSERT INTO group_table (_id,name) VALUES (?,?);',
                [
                    group._id,
                    group.name
                ],
                ()=>console.log("insert data to group table"),
                (err)=> console.log("error in inserting",err)
            )
           })
        })
    }
    catch(err){
        console.log("Error in inserting",err);
    }
}