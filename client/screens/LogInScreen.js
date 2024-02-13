import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";
import { FontAwesome5 } from '@expo/vector-icons';
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";
import { useDispatch } from "react-redux";
import { loadUser, loginUser } from "../store/session";
import { validateEmail } from "../util/emailValidation";
import Input from "../components/Input";
import GoogleLogin from "../components/GoogleLogin";

export default function LogInScreen() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const dispatch = useDispatch();

    const handleEmailInput = (input) => {
        setEmail(input);
    }

    const handlePasswordInput = (input) => {
        setPassword(input);
    }

    // to-do: handleLogin
    const handleLogin = async () => {
        const returningUser = {
            email,
            password,
            isLoggedIn: true
        }

        setErrors({});
        const submitErrors = {};

        if (email.length < 1) {
            submitErrors.email.push("Please enter your email");
        };

        if (!validateEmail(email)) {
            submitErrors.email.push("Please enter a valid email");
        };

        if (password.length < 1) {
            submitErrors.password.push("Please enter your password");
        };

        if (Object.keys(submitErrors).length > 0) {
            return setErrors(submitErrors);
        };

        return dispatch(loginUser(returningUser));
    }

	return (
		<SafeAreaView style={styles.rootContainer}>
            <KeyboardAvoidingView>

                <Text style={styles.headerText}>Welcome back!</Text>
                <View style={styles.formContainer}>
                    <Input
                        labelText="Email"
                        placeholderText="Enter your email"
                        inputValue={email}
                        handleTextChange={handleEmailInput}
                        errors={errors.email}
                    />

                    <Input
                        labelText="Password"
                        placeholderText="Enter your password"
                        inputValue={password}
                        handleTextChange={handlePasswordInput}
                        errors={errors.password}
                        isLogin={true}
                    />
                </View>

                <PrimaryButton
                    buttonText="Login"
                    onPress={handleLogin}
                />

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text>or login with</Text>
                    <View style={styles.divider} />
                </View>

                <GoogleLogin />

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
        padding: 16,
        fontSize: 16,
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
