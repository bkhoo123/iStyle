import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import ActionBar from '../../components/ActionBar';

export default function CreateClosetScreen() {
    const [ closetName, setClosetName ] = useState("");
    const [ closetType, setClosetType ] = useState("");
    const [ closetNotes, setClosetNotes ] = useState("");

    const handleClosetNameInput = (input) => {
        setClosetName(input);
    };

    const handleClosetTypeInput = (input) => {
        setClosetType(input);
    };

    const handleClosetNotesInput = (input) => {
        setClosetNotes(input);
    };

  return (
    <View style={styles.rootContainer}>
      <ActionBar />
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

  )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
    }
})
