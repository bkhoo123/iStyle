import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";

export default function LogInScreen() {
    const [ credential, setCredential ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);

    let [fontsLoaded, fontError] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

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

                <Text style={styles.headerText}>Welcome back!</Text>
                <View style={styles.formContainer}>
                    {/* to-do: email field */}
                    <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Email</Text>
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
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            style={styles.formInput}
                            value={password}
                            onChangeText={passwordInputHandler}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <PrimaryButton
                    buttonText="Login"
                    // onPress={handleLogin}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text>or login with</Text>
                    <View style={styles.divider} />
                </View>

                <SocialButton
                    buttonText="Sign in with Google"
                >
                    <FontAwesome name="google" size={24} color="black" />
                </SocialButton>

                <SocialButton
                    buttonText="Sign in with Facebook"
                >
                    <FontAwesome5 name="facebook" size={24} color="black" />
                </SocialButton>

            </KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 18,
    },
    montserratRegular: {
        fontFamily: 'Montserrat_400Regular',
    },
    headerText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 22,
        marginTop: 26,
        marginLeft: 18,
        marginBottom: 18
    },
    formContainer: {
        // marginTop: 10,
        padding: 8
    },
    formGroup: {
        width: '100%',
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    formLabel: {
        fontSize: 16,
    },
    formInput: {
        color: Palette.primary,
        marginVertical: 10,
        width: '100%',
        borderColor: Palette.primary,
        borderWidth: 1,
        padding: 8,
        fontSize: 18,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 26,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Palette.primary,
        marginHorizontal: 25,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 25,
        marginTop: 18,
        borderWidth: 1,
        borderColor: Palette.primary,
        gap: 18,
    },
});
