import React, { useEffect, useState, useContext } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { app } from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { StateContext } from "./StateProvider";
import colours from "../styles/Colours";

const Login = ({ navigation }) => {
    const { setUserID } = useContext(StateContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const db = getFirestore(app);
    useEffect(async () => {
        // onAuthStateChanged(auth, async (user) => {
        //     if (user) {
        //         setUserID(user.uid);
        //         console.log("Logged in with UID: " + user.uid);
        //         navigation.navigate("Start");
        // //     }

        // });
        console.log("yoyoo");
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email.trim(), password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
            })
            .catch((error) => alert(error.message));
    };

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {/* Logo Circle */}
            <View
                style={{
                    width: 250,
                    height: 250,
                    backgroundColor: colours.white,
                    borderRadius: 999,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: 180,
                        height: 180,
                        resizeMode: "contain",
                    }}
                    source={require("../assets/logo.png")}
                ></Image>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="john.appleseed@apple.com"
                    placeholderTextColor={colours.darkGrey}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    keyboardType={"email-address"}
                    returnKeyType={"next"}
                />

                <TextInput
                    placeholder="●●●●●●●●"
                    placeholderTextColor={colours.darkGrey}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    returnKeyType={"done"}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        height: 70,
                        backgroundColor: colours.black,
                        paddingHorizontal: 25,
                        borderRadius: 100,
                        marginVertical: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50,
                    }}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    inputContainer: {
        width: "80%",
        marginTop: 20,
    },

    input: {
        height: 70,
        backgroundColor: "white",
        paddingHorizontal: 25,
        borderRadius: 100,
        marginVertical: 8,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    button: {
        backgroundColor: colours.black,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
    },

    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: colours.black,
        borderWidth: 2,
    },

    buttonOutlineText: {
        color: colours.black,
        fontWeight: "700",
        fontSize: 16,
    },
});
