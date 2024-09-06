
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// home page
import HomePage from "../pages/volunteer/HomePages/HomePage";
import BottomTabs from "./BottumTabNavigation";

// verify
import SingleUserVerification from "../pages/volunteer/Verification/SingleUserVerification";
import VerifyTopTabNavigation from "./TopTabNavigation";
import Input_data from "../pages/volunteer/Verification/Input_data";
import Login from "../pages/volunteer/Login/LoginPage";
import VolunteerProfile from "../pages/volunteer/Profile/Profile_v";
import QRCodeScanner from "../pages/volunteer/Verification/QRCodeScanner";
import ChooseEvent from "../pages/volunteer/LandingPage/ChooseEvent";

const Stack = createNativeStackNavigator();

export default function MyStack(){
   
    return(
        <NavigationContainer>
         
            <Stack.Navigator initialRouteName="Login">
                
                <Stack.Screen name="entrypage" component={ChooseEvent} options={{headerShown:false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
           
                <Stack.Screen name="home" component={HomePage} options={{headerShown:false}} />
                
                
                <Stack.Screen name ="bottomTab" component={BottomTabs} options={{headerShown:false}} cache={false}/>
                <Stack.Screen name="qrscanner" component={QRCodeScanner} options={{title:'Scanner'}} />

               
                <Stack.Screen name="singleUserVerify" component={SingleUserVerification} options={{headerShown:false}}  />
               
                <Stack.Screen name="TopTab" component={VerifyTopTabNavigation} />
                <Stack.Screen name="Input Data" component={Input_data} options={{title:'Check'}}/>
                <Stack.Screen name="Profile" component={VolunteerProfile} />
               
            </Stack.Navigator>
             {/* )
            } */}
        </NavigationContainer>
    )
}