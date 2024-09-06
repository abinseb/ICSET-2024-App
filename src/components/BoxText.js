import React from "react";
import { View,Text, StyleSheet } from "react-native";

const BoxText=({message})=>{
    

    return(
        <View style={styles.boxContainer}>
            <Text style={styles.TextStyle}>{message}</Text>
        </View>
    )
}

export default BoxText;

const styles = StyleSheet.create({
    boxContainer:{
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#012E41',
        borderWidth:1,
        borderColor:'#ffff',
        height:'30%',
        width:'70%',
        borderRadius:20
    },
    TextStyle:{
        fontSize:25,
        fontWeight:'400',
        color:'#ffff',
        alignSelf:'center'
    }

})