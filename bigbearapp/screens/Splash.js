import { useEffect, useContext } from "react";
import { View, Image, Text } from "react-native";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StateContext } from "./StateProvider";
import GlobalStyles from "../styles/GlobalStyles";
import Colours from "../styles/Colours";

const Splash = ({ navigation }) => {
    const { userID, setUserID, colours } = useContext(StateContext);
    const auth = getAuth(app);

    useEffect(() => {
        let navigateTo;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                console.log("Logged in with UID: " + user.uid);
                navigateTo = "Start";
            } else {
                navigateTo = "Login";
            }
            setTimeout(() => {
                navigation.navigate(navigateTo);
            }, 1000);
        });
    }, []);

    return (
        <View
            style={{
                backgroundColor: Colours.white,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={require("../assets/logo.png")}
            ></Image>
        </View>
    );
};

export default Splash;
