import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Profile from "./Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colours from "../styles/Colours";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    height: 80,
                    paddingBottom: 20,
                },
            }}
        >
            <Tabs.Screen
                name="Home Page"
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 5,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="home"
                                color={focused ? colours.black : colours.grey}
                                size={35}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? colours.black
                                        : colours.grey,
                                    fontSize: 10,
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    ),
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 5,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="account-circle"
                                color={focused ? colours.black : colours.grey}
                                size={35}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? colours.black
                                        : colours.grey,
                                    fontSize: 10,
                                }}
                            >
                                Profile
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

const HomePage = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Aayush is a loser pig</Text>
        </View>
    );
};

export default Home;
