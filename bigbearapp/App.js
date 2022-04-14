import { NavigationContainer } from "@react-navigation/native";
import { StateProvider } from "./screens/StateProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import Splash from "./screens/Splash";
import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-na"]);

export default function App() {
    return (
        <StateProvider>
            <StatusBar hidden="true"></StatusBar>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                    ></Stack.Screen>

                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </StateProvider>
    );
}
