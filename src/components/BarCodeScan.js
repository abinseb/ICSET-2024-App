import React, { useEffect, useRef, useState } from "react";
import {View , Text , StyleSheet} from 'react-native';
import{BarCodeScanner} from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/native";
const BarCodeScan =()=>{
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
     
            <BarCodeScanner
                onBarCodeScanned={scanned?null || false :handleBarCodeScanned}
                style={styles.scannerStyle}
            />

       
    )
}

export default BarCodeScan;

const styles = StyleSheet.create({
    scannerStyle:{
        height:'80%',
        width:'80%',
        alignSelf:'center'
    }
})