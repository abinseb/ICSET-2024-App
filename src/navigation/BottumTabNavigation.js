import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanQR from '../pages/volunteer/Verification/ScanQR';
import BulkVerification from '../pages/volunteer/Verification/CollegeList';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs(){
    return(
        <Tab.Navigator
            screenOptions={{headerShown:false,tabBarStyle:{backgroundColor:'#D9D9D9'},tabBarActiveBackgroundColor:'#a9a9a9'}}
           
        >
            <Tab.Screen name='ScanQRCode' component={ScanQR} 
                options={{
                    tabBarIcon:({color,size})=>(
                        <MaterialIcons name="qr-code-scanner" size={24} color='black'/>
                    ),
                    tabBarLabel:'Scan',
                }}
            
            />
            <Tab.Screen name='BulkVerification' component={BulkVerification}
                options={{
                    tabBarIcon:()=>(
                        <MaterialIcons name='groups' size={24} color="black" />
                    ),
                    tabBarLabel:'Bulk Registration',
                }}
            />
        </Tab.Navigator>
    )
}