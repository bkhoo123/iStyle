import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Palette from "../constants/Palette";
// import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SocialButton from "../components/SocialButton";
import PrimaryButton from "../components/PrimaryButton";
import { useDispatch } from "react-redux";
import { signUpUser } from "../store/session";
import { validateEmail } from "../util/emailValidation";
import Input from "../components/Input";
import { unitConversion } from "../util/unitConversion";

export default function SignUpScreen() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const dispatch = useDispatch();

	// for getting user gender and height information
	// const [ sex, setSex ] = useState(null);
	// const [ height, setHeight ] = useState(0);
	// const [ isMetric, setIsMetric ] = useState(true);

	const handleFirstNameInput = (input) => {
		setFirstName(input);
	};

  const handleLastNameInput = (input) => {
		setLastName(input);
	};

	const handleEmailInput = (input) => {
		setEmail(input);
	};

	const handlePasswordInput = (input) => {
		setPassword(input);
	};

	const handleConfirmPasswordInput = (input) => {
		setConfirmPassword(input);
	};

	const genderOptions = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
		{ label: "Non-binary", value: "non-binary" },
	];

	const handleSexInput = (input) => {
		setSex(input);
	};

	const handleMetricChange = (input) => {
		setIsMetric(value);

		if (height > 0) {
			const convertedHeight = unitConversion(value, height);
			setHeight(convertedHeight);
		}
	};

	const handleHeightInput = (input) => {
		setHeight(input);
	};

	// to-do: handleSignup
<<<<<<< HEAD
  const handleSignUp = async () => {
    const newUser = {
      name,
      credential,
      password,
      sex,
      height
    }

    setErrors({});
    const submitErrors = {};

    if (name.length < 1) {
      submitErrors.name.push("Please enter your name");
    };

    if (credential.length < 1) {
      submitErrors.email.push("Please enter your email");
    };

    if (!validateEmail(credential)) {
      submitErrors.email.push("Please enter a valid email");
    };

    if (password.length < 1) {
      submitErrors.password.push("Please enter a password");
    };

    if (password.length < 8) {
      submitErrors.password.push("Password must be at least 8 characters long");
    };

    if (password.length > 50) {
      submitErrors.password.push("Password must be less than 50 characters long");
    };

    if (!sex) {
      submitErrors.sex.push("Please select the sex you identify as");
    }

    if (!height) {
      submitErrors.height.push("Please enter your height");
    }

    if (Object.keys(submitErrors).length > 0) {
        return setErrors(submitErrors);
    };

    return dispatch(signup(newUser));
  }
=======
	const handleSignUp = async () => {
		const newUser = {
			firstName,
      lastName,
			email,
			password,
		};

		console.log("newUser:", newUser);

		setErrors({});
		const submitErrors = {};

		if (firstName.length < 1) {
      submitErrors.firstName = [];
			submitErrors.firstName.push("Please enter your first name");
		}

    if (lastName.length < 1) {
      submitErrors.lastName = [];
			submitErrors.lastName.push("Please enter your last name");
		}

		if (email.length < 1) {
      submitErrors.email = [];
			submitErrors.email.push("Please enter your email");
		}

		if (!validateEmail(email)) {
      if (!submitErrors.email) {
        submitErrors.email = [];
      }
			submitErrors.email.push("Please enter a valid email");
		}

		if (password.length < 1) {
      submitErrors.password = [];
			submitErrors.password.push("Please enter a password");
		}

		if (password.length < 8) {
      if (!submitErrors.password) {
        submitErrors.password = [];
      }
			submitErrors.password.push("Password must be at least 8 characters long");
		}

		if (password.length > 50) {
      if (!submitErrors.password) {
        submitErrors.password = [];
      }
			submitErrors.password.push("Password must be less than 50 characters long");
		}

    if (confirmPassword.length < 1) {
      submitErrors.confirmPassword = [];
      submitErrors.confirmPassword.push("Please confirm your password");

    }

		if (password !== confirmPassword) {
      if (!submitErrors.password) {
        submitErrors.confirmPassword = [];
      }
			submitErrors.confirmPassword.push("Passwords do not match");
		}

		// if (!sex) {
		//   submitErrors.sex.push("Please select the sex you identify as");
		// }

		// if (!height) {
		//   submitErrors.height.push("Please enter your height");
		// }

		if (Object.keys(submitErrors).length > 0) {
			return setErrors(submitErrors);
		}

		return dispatch(signUpUser(newUser));
	};
>>>>>>> main

	return (
		<SafeAreaView style={styles.rootContainer}>
			<KeyboardAvoidingView>
				<ScrollView>
					<Text style={styles.headerText}>Step into a smarter wardrobe.</Text>

					<View style={styles.formContainer}>
						<Input
							labelText="First Name"
							placeholderText="Enter your first name"
							inputValue={firstName}
							handleTextChange={handleFirstNameInput}
							errors={errors.firstName}
						/>

            <Input
							labelText="Last Name"
							placeholderText="Enter your last name"
							inputValue={lastName}
							handleTextChange={handleLastNameInput}
							errors={errors.lastName}
						/>

						{/* to-do: email field */}
						<Input
							labelText="Email"
							placeholderText="Enter your email"
							inputValue={email}
							handleTextChange={handleEmailInput}
							errors={errors.email}
						/>

						{/* to-do: password field */}
						<Input
							labelText="Password"
							placeholderText="Enter your password"
							inputValue={password}
							handleTextChange={handlePasswordInput}
							errors={errors.password}
						/>

						<Input
							labelText="Confirm Password"
							placeholderText="Re-enter your password"
							inputValue={confirmPassword}
							handleTextChange={handleConfirmPasswordInput}
							errors={errors.confirmPassword}
							// errors={confirmPassword !== "" && password !== confirmPassword ? ["Passwords do not match"] : ""}
						/>

						{/* <Input
                labelText="Sex"
                placeholderText={{ label: 'Select Sex', value: null }}
                inputType="dropdown"
                genderOptions={genderOptions}
                inputValue={sex}
                handleTextChange={handleSexInput}
                errors={errors.sex}
              /> */}

						{/* to-do: add radio button to select metric/imperial */}
						{/* to-do: add input for metric value */}
						{/* to-do: add input for imperial value */}
						{/* <Input
                labelText="Height"
                isMetric={isMetric}
                placeholderText={isMetric ? "E.g. 180" : ["Eg. 5ft", "10in"]}
                inputType="radio"
                inputValue={height}
                handleTextChange={[handleMetricChange, handleHeightInput]}
                errors={errors.height}
              /> */}
					</View>

					<PrimaryButton buttonText="Sign Up" onPress={handleSignUp} />

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
		backgroundColor: "#FFFFFF",
		flex: 1,
		padding: 18,
	},
	montserratRegular: {
		fontFamily: "Montserrat_400Regular",
	},
	headerText: {
		fontFamily: "Montserrat_600SemiBold",
		fontSize: 22,
		marginTop: 26,
		marginLeft: 18,
	},
	formContainer: {
		// marginTop: 10,
		padding: 8,
	},

	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 26,
	},
	divider: {
		flex: 1,
		height: 1,
		backgroundColor: Palette.primary,
		marginHorizontal: 25,
	},
});
