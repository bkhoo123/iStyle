import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";

export default function LogInScreen() {
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    const emailInputHandler = (input) => {
        setCredential(input);
    }

    const passwordInputHandler = (input) => {
        setPassword(input);
    }

    // to-do: handleLogin

	return (
		<SafeAreaView style={styles.rootContainer}>
            <KeyboardAvoidingView>

                <Text>Step into a smarter wardrobe.</Text>
                <View style={styles.formContainer}>
                    {/* to-do: email field */}
                    <View style={styles.formGroup}>
                        <Text>Email</Text>
                        <TextInput
                            placeholder="Enter your email"
                            style={styles.formInput}
                            value={credential}
                            onChangeText={emailInputHandler}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* to-do: password field */}
                    <View style={styles.formGroup}>
                        <Text>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            style={styles.formInput}
                            value={password}
                            onChangeText={passwordInputHandler}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <Pressable
                    style={styles.button}
                    // onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View>
                    {/* to-do: google button */}
                    {/* to-do: facebook button */}
                </View>
            </KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: Palette.background,
        flex: 1,
        // alignItems: 'center',
    },
    formContainer: {
        marginTop: 36,
        padding: 8
    },
    formGroup: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 18,
    },
    formInput: {
        color: Palette.primary,
        marginVertical: 10,
        width: '100%',
        borderColor: Palette.border,
        borderWidth: 1,
        padding: 8,
    },
    button: {
        width: '87%',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: Palette.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: Palette.background,
    }
});
