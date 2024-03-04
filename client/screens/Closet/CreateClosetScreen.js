import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import ActionBar from "../../components/ActionBar";
import { useDispatch } from "react-redux";
import { addCloset } from "../../store/closet";

export default function CreateClosetScreen() {
	const dispatch = useDispatch();
	const [closetName, setClosetName] = useState("");
	const [closetType, setClosetType] = useState("");
	const [closetNotes, setClosetNotes] = useState("");

	const handleClosetNameInput = (input) => {
		setClosetName(input);
	};

	const handleClosetTypeInput = (input) => {
		setClosetType(input);
	};

	const handleClosetNotesInput = (input) => {
		setClosetNotes(input);
	};

	const handleClosetSave = () => {
		const newCloset = {
			closetName,
			closetType,
			closetNotes,
		};

		if (newCloset.closetName.length < 1) {
			Alert.alert("Error", "Please enter a closet name.");
			return;
		}

		console.log("newCloset ==>", newCloset);

    try {
      dispatch(addCloset(newCloset));
    } catch (error) {
      Alert.alert("Failed to Create", "Could not create new closet");
    }
	};

	return (
		<View style={styles.rootContainer}>
			<ActionBar onPress={handleClosetSave} />
			<CustomInput
				labelName="Closet Name"
				labelText={closetName}
				placeholderText="ex: Spring"
				handleTextChange={handleClosetNameInput}
			/>
			<CustomInput
				labelName="Type"
				labelText={closetType}
				placeholderText="ex: Some type lol"
				handleTextChange={handleClosetTypeInput}
			/>
			<CustomInput
				labelName="Notes"
				labelText={closetNotes}
				placeholderText="ex: All clothes for the spring season"
				isMultiline={true}
				numLines={4}
				handleTextChange={handleClosetNotesInput}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: "white",
	},
});
