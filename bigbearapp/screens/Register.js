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

const Register = ({ navigation }) => {
    const { setUserID } = useContext(StateContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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
                await setDoc(usersDocRef, { verified: false, name: name });
            }
            alert("User registered. Please wait for verification.");
            signOut(auth);
        } catch (error) {
            alert(error);
            return;
        }
    };

    const secondInput = useRef(null);
    const thirdInput = useRef(null);

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
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="John"
                            placeholderTextColor={colours.darkGrey}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                            keyboardType={"default"}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                secondInput.current.focus();
                            }}
                            blurOnSubmit={false}
                            textContentType="oneTimeCode"
                            autoComplete="off"
                        />
                        <TextInput
                            placeholder="john.appleseed@apple.com"
                            placeholderTextColor={colours.darkGrey}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                            keyboardType={"email-address"}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                thirdInput.current.focus();
                            }}
                            blurOnSubmit={false}
                            textContentType="oneTimeCode"
                            autoComplete="off"
                            ref={secondInput}
                        />

                        <TextInput
                            placeholder="●●●●●●●●"
                            placeholderTextColor={colours.darkGrey}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            returnKeyType={"done"}
                            secureTextEntry
                            ref={thirdInput}
                            textContentType="oneTimeCode"
                        />

                        <TouchableOpacity
                            onPress={handleSignUp}
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
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Register;

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
