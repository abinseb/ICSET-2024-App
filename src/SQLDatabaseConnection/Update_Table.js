// update user table for updating wrkshops
import { openDatabase } from "expo-sqlite";
import { offline_dataInsert } from "./Insert_Table";
const db = openDatabase('Event.db');


// update user data based on id
export const update_user_Table =(userData  )=>{
    try{
        console.log("parameters",workshop);
        db.transaction((tx)=>{
            userData.forEach(element => {
               workshop.forEach(workshop =>{
                console.log("valuesof workshop",element.workshops[workshop]);
                tx.executeSql(
                    `UPDATE user_table SET verification = ? WHERE id = ?;`,
                    [ , element._id],
                    ()=>console.log("updated successfully user_table"),
                    (error)=> console.log("updation error",error)
                )  
               })            
            });
        })
    }
    catch(error){
        console.error(error)
    }
}

export const userVerification_Offline=(userid,workshop)=>{
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                `UPDATE user_table SET verification = ? WHERE _id = ? ;`,
                [true,userid],
                ()=>{
                    offline_dataInsert(userid);
                    alert("Verified");
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

// unverify
export const unverification_Offline=(userid,workshop)=>{
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                `UPDATE user_table SET ${workshop} = ? WHERE id = ? ;`,
                ['1.0',userid],
                ()=>{
                   
                    console.log("unverified_offline");
                    },
                (error)=>console.log("unverificationError",error)
            )
        })
    }
    catch(error){
        console.log("unverification_Transaction error", error);
    }
}


// background updation of local sqlite table
export const update_local_Table=(updatedData,workshop)=>{
    try{
        db.transaction((tx)=>{
            updatedData.particpants.forEach((participants)=>{
                workshop.forEach((workshopname)=>{
                    console.log(participants._id,workshopname);
                    tx.executeSql(

                        `UPDATE user_table SET ${workshopname} = ?, Time = ? WHERE id = ?;`,
                        [participants.workshops[workshopname],updatedData.time,participants._id],
                        ()=>console.log("Back ground Updation successfull"),
                        (error)=>console.error("Error in Updation",error)
                    )
                })
            })
        })
    }
    catch(error){

    }
}