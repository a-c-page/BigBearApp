import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { app } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { StateContext } from "./StateProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colours from "../styles/Colours";

const Profile = ({ navigation }) => {
    const { setUserID, setFoodItems, setTransportItems, userID } =
        useContext(StateContext);
    const auth = getAuth(app);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Reset all the states
                setUserID("");
                navigation.popToTop();
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <MaterialCommunityIcons
                name="account-circle"
                color={colours.black}
                size={150}
            />
            <Text style={{ paddingBottom: 150 }}>User ID: {userID}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
                <MaterialCommunityIcons
                    name="logout-variant"
                    color={colours.white}
                    size={30}
                    style={{ paddingLeft: 10 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#a70000",
        width: 200,
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },

    buttonText: {
        color: colours.white,
        fontWeight: "700",
        fontSize: 16,
    },
});
