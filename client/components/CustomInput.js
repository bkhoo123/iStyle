import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette'

export default function CustomInput({ labelName, placeholderText, inputText, handleTextChange, isMultiline, numLines }) {
    if (isMultiline) {
        return (
            <View style={styles.multilineContainer}>
                <Text style={styles.inputLabel}>{ labelName }</Text>
                <TextInput
                    placeholder={placeholderText}
                    style={styles.inputText}
                    value={inputText}
                    onChangeText={handleTextChange}
                    multiline={true}
                    numberOfLines={numLines}
                />
            </View>
        )
    }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{ labelName }</Text>
      <TextInput
        placeholder={placeholderText}
        style={styles.inputText}
        value={inputText}
        onChangeText={handleTextChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: Palette.border,
        borderTopWidth: 1,
        padding: 12,
        backgroundColor: 'white',
        height: 75,
    },
    inputLabel: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    inputText: {
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    multilineContainer: {
        height: 150,
        borderColor: Palette.border,
        borderTopWidth: 1,
        padding: 12,
        backgroundColor: 'white',
    }
})
