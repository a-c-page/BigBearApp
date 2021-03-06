import React, { useEffect, useState, useContext, useRef } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { app } from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
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

    const handleSignUp = async () => {
        try {
            userCredentials = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );
            const user = userCredentials.user;
            console.log("Registered with:", user.email);
            const usersDocRef = doc(db, "users", user.uid);
            const usersDocSnap = await getDoc(usersDocRef);
            if (!usersDocSnap.exists()) {
                await setDoc(usersDocRef, { verified: false });
            }
            alert("User registered. Please wait for verification.");
            signOut(auth);
        } catch (error) {
            alert(error);
            return;
        }
    };

    const handleLogin = async () => {
        try {
            userCredentials = await signInWithEmailAndPassword(
                auth,
                email.trim(),
                password
            );
            const user = userCredentials.user;
            const usersDocRef = doc(db, "users", user.uid);
            const usersDocSnap = await getDoc(usersDocRef);

            let info = usersDocSnap.data();
            if (info["verified"]) {
                console.log("Logged in: ", user.uid, user.email);
                navigation.navigate("Home");
            } else {
                alert("Not verified!");
                signOut(auth);
            }
        } catch (error) {
            alert(error);
            return;
        }
    };

    useEffect(async () => {}, []);

    const secondInput = useRef(null);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
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
                            onSubmitEditing={() => {
                                secondInput.current.focus();
                            }}
                            blurOnSubmit={false}
                            textContentType="oneTimeCode"
                            autoComplete="off"
                        />

                        <TextInput
                            placeholder="????????????????????????"
                            placeholderTextColor={colours.darkGrey}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            returnKeyType={"done"}
                            secureTextEntry
                            ref={secondInput}
                            textContentType="oneTimeCode"
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

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Register");
                            }}
                            style={{
                                height: 50,
                                alignContent: "center",
                                justifyContent: "center",
                                alignSelf: "center",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colours.darkGrey,
                                }}
                            >
                                Don't have an account?{" "}
                                <Text
                                    style={{
                                        color: colours.black,
                                    }}
                                >
                                    Sign Up!
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
