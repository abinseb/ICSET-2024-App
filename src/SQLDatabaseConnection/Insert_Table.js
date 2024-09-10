import { openDatabase } from "expo-sqlite";
import { Group_list_load, event_Data_Load, user_data_load, workshop_data_load } from "../API_Communication/Load_data";
const db = openDatabase('Event.db');

// insert to user table
export const insert_To_UserTable=async()=>{

    try{
        const userData = await user_data_load();
        
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
                            user.institutionId?._id || null,
                            user.type,
                            user.time || 0,
                            user.type === 3 ?  user.organizationName : user.institutionId.name ,
                            user.attendanceStatus || false
                        ],
                        () => {
                            console.log("-----inserted into userTable--------",user);
                            resolve();
                        },
                        (error) => {
                            console.error(user,"Error in inserting_user_table", error);
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

export const offline_dataInsert=(userid,value)=>{
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO offline_table (_id , status) VALUES (?,?);',
                [userid , value],
                ()=>console.log("Insert id and status offlinetable"),
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
           groupData.data.institutions.forEach((group)=>{
            tx.executeSql(
                'INSERT INTO group_table (_id,name) VALUES (?,?);',
                [
                    group.institution._id,
                    group.institution.name
                ],
                ()=>console.log("insert data to group table"),
                (err)=> console.log("error in inserting---group",err)
            )
           })
        })
    }
    catch(err){
        console.log("Error in inserting",err);
    }
}