import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotVerifiedToVerify from "../pages/volunteer/Verification/NotVerifiedList";
import VerifiedToNotVerify from "../pages/volunteer/Verification/VerifiedToNotVerify";
import { Octicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator()

export default function VerifyTopTabNavigation({route}){
    // const route = useRoute();
    const { groupid,groupname } = route.params;

    return(
        <Tab.Navigator
            screenOptions={{headerShown:false,tabBarActiveBackgroundColor:'#dcdcdc'}}
        >
            <Tab.Screen 
            name="NotVerified" 
            component={NotVerifiedToVerify} 
            initialParams={ {groupid,groupname} }
            options={{
                tabBarIcon:()=>(
                    <Octicons name="unverified" size={24} color="red" />
                )
            }}
            
           
             />
            <Tab.Screen 
            name="Verified" 
            component={VerifiedToNotVerify}  
            initialParams={ {groupid,groupname} }
            options={{
                tabBarIcon:()=>(
                    <Octicons name="verified" size={24} color="green" />
                )
            }}
           
            />
        </Tab.Navigator>
    )
}