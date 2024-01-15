import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";
// import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";
import { useDispatch } from "react-redux";
import { signup } from "../store/session";
import { validateEmail } from "../util/emailValidation";
import ErrorText from "../components/ErrorText";

export default function SignUpScreen() {
  const [ name, setName ] = useState("");
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

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

    // to-do: error message if password and confirm password fields do not match
	};

	// to-do: handleSignup
  const handleSignUp = async () => {
    const newUser = {
      name,
      credential,
      password
    }

    setErrors({});
    const submitErrors = {
      name: [],
      email: [],
      password: []
    };

    if (name.length < 1) {
      // to-do: name is required
      submitErrors.name.push("Please enter your name");
    };

    if (credential.length < 1) {
      // to-do: email is required
      submitErrors.email.push("Please enter your email");
    };

    // to-do: validate email
    if (!validateEmail(credential)) {
      submitErrors.email.push("Please enter a valid email");
    };

    if (password.length < 1) {
      // to-do: password is required
      submitErrors.password.push("Please enter a password");
    };

    if (password.length < 8) {
      // to-do: password length must be at least 8 characters long
      submitErrors.password.push("Password must be at least 8 characters long");
    };

    if (password.length > 50) {
      // to-do: password length must be less than 50 characters long
      submitErrors.password.push("Password must be less than 50 characters long");
    };

    console.log("submitErrors", submitErrors, Object.keys(submitErrors));

    if (Object.keys(submitErrors).length > 0) {
        setErrors(submitErrors);
        console.log("errors", errors);
        return;
    };


      // return dispatch(signup(newUser));
  }

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
              {
                errors.name ? (
                  <ErrorText>{ errors.name }</ErrorText>
                ) : ""
              }
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
              {
                errors.email ? (
                  <ErrorText>{ errors.email }</ErrorText>
                ) : ""
              }
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
              {
                errors.password ? (
                  <ErrorText>{ errors.password }</ErrorText>
                ) : ""
              }
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
              {
                password !== confirmPassword ? (
                  <ErrorText>Passwords do not match</ErrorText>
                ) : ""
              }
            </View>
          </View>

          <PrimaryButton
            buttonText="Sign Up"
            onPress={handleSignUp}
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
