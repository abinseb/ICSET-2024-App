// update user table for updating wrkshops
import { openDatabase } from "expo-sqlite";
import { offline_dataInsert } from "./Insert_Table";
const db = openDatabase('Event.db');

export const userVerification_Offline=(userid,status)=>{
    console.log("userid",userid,"status",status);
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                `UPDATE user_table SET attendanceStatus = ? WHERE _id = ? ;`,
                [status,userid],
                ()=>{
                    offline_dataInsert(userid , status);
                    console.log("userverified_offline");
                    },
                (error)=>console.log("verificationError",error)
            )
        })
    }
    catch(error){
        console.log("Transaction error", error);
    }
}


export const offlineBulkVerification =(userIdArray , status)=>{
    console.log("userid",userIdArray,"status",status);
    try{
        db.transaction((tx)=>{
            userIdArray.forEach((userid)=>{
                tx.executeSql(
                    `UPDATE user_table SET attendanceStatus = ? WHERE _id = ? ;`,
                    [status,userid],
                    ()=>{
                        offline_dataInsert(userid , status);
                        console.log("userverified_offline");
                        },
                    (error)=>console.log("verificationError",error)
                )
            })
        })
    }
    catch(error){
        console.log("Transaction error", error);
    }
}

// unverify
// export const unverification_Offline=(userid,workshop)=>{
//     try{
//         db.transaction((tx)=>{
//             tx.executeSql(
//                 `UPDATE user_table SET verification = ? WHERE _id = ? ;`,
//                 [false,userid],
//                 ()=>{
//                     offline_dataInsert(userid,false);
//                     console.log("unverified_offline");
//                     },
//                 (error)=>console.log("unverificationError",error)
//             )
//         })
//     }
//     catch(error){
//         console.log("unverification_Transaction error", error);
//     }
// }


// background updation of local sqlite table
export const update_local_Table=(updatedData)=>{
    try{
        db.transaction((tx)=>{
            updatedData.data.forEach((participants)=>{
                    tx.executeSql(
                        `UPDATE user_table SET attendanceStatus = ?, time = ? WHERE _id = ?;`,
                        [participants.attendanceStatus,updatedData.maximiumTime,participants.registrationId],
                        ()=>console.log("Back ground Updation successfull"),
                        (error)=>console.error("Error in Updation",error)
                    )
            })
        })
    }
    catch(error){
        console.log("transaction error",error)
    }
}