import React, { useEffect, useRef, useState } from "react";
import {View , Text , StyleSheet} from 'react-native';
import{BarCodeScanner} from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const QRCodeScanner =()=>{
    const [hasPermission,setPermission] = useState(null);
    const [scanned,setScanned] = useState(false);
    // const [qrData , setQrData] = useState('');
    const qrdata = useRef('');
    const navigation = useNavigation();

    const handleBarCodeScanned=({type,data})=>{
        setScanned(true);
        // setQrData(data);
        qrdata.current = data;
        alert("scanned",data);
        navigationToVerification();
    }
  const navigationToVerification=()=>{
        navigation.navigate("singleUserVerify" , {qrdata:qrdata.current} );
    }

    useEffect(()=>{
        (async()=>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();
    },[])
    return(
        <SafeAreaView style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned?null || false :handleBarCodeScanned}
                style={styles.scannerStyle}
            />
        </SafeAreaView>

       
    )
}

export default QRCodeScanner;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#012E41',
        flex:1,
        justifyContent:"center"
    },
    scannerStyle:{
        height:'80%',
        width:'80%',
        alignSelf:'center'
    }
})