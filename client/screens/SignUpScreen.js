import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";

export default function SignUpScreen() {
  const [ name, setName ] = useState("");
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	let [fontsLoaded, fontError] = useFonts({
		Montserrat_400Regular,
		Montserrat_600SemiBold,
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}

  const handleNameInput = (input) => {
    setName(input);
  }

	const handleEmailInput = (input) => {
		setCredential(input);
	};

	const handlePasswordInput = (input) => {
		setPassword(input);
	};

  const handleConfirmPasswordInput = (input) => {
		setConfirmPassword(input);
	};

	// to-do: handleSignup

	return (
		<SafeAreaView style={styles.rootContainer}>
			<KeyboardAvoidingView>
        <ScrollView>
          <Text style={styles.headerText}>Step into a smarter wardrobe.</Text>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.formInput}
                value={name}
                onChangeText={handleNameInput}
                autoCapitalize="none"
              />
            </View>

            {/* to-do: email field */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                style={styles.formInput}
                value={credential}
                onChangeText={handleEmailInput}
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
                onChangeText={handlePasswordInput}
                secureTextEntry={true}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Confirm Password</Text>
              <TextInput
                placeholder="Re-enter your password"
                style={styles.formInput}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordInput}
                secureTextEntry={true}
              />
            </View>
          </View>

          <PrimaryButton
            buttonText="Sign Up"
            // onPress={handleSignUp}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text>or sign up with</Text>
            <View style={styles.divider} />
          </View>

          <SocialButton buttonText="Sign in with Google">
            <FontAwesome name="google" size={24} color="black" />
          </SocialButton>

          <SocialButton buttonText="Sign in with Facebook">
            <FontAwesome5 name="facebook" size={24} color="black" />
          </SocialButton>
        </ScrollView>
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
        marginLeft: 18
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
});
