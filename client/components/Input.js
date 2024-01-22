import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React from 'react'
import ErrorText from './ErrorText'
import Palette from '../constants/Palette'
import RNPickerSelect from 'react-native-picker-select';
import SecondaryButton from './SecondaryButton';

export default function Input({ labelText, placeholderText, inputValue, handleTextChange, errors, inputType, genderOptions }) {

    if (inputType === "radio") {
        return (
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                    { labelText }
                </Text>
            </View>
        )
    }

    if (inputType === "dropdown") {
        return (
            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{ labelText }</Text>
                <RNPickerSelect
                    placeholder={placeholderText}
                    items={genderOptions}
                    value={inputValue}
                    onValueChange={handleTextChange}
                />
                {
                    errors ? (
                        <ErrorText>{ errors }</ErrorText>
                    ) : ""
                }
            </View>
        )
    }

  return (
    <View style={styles.formGroup}>
        <Text style={styles.formLabel}>{ labelText }</Text>
        <TextInput
            placeholder={placeholderText}
            style={styles.formInput}
            value={inputValue}
            onChangeText={handleTextChange}
            autoCapitalize="none"
            secureTextEntry={labelText.includes("Password") ? true : false}
        />
        {
            labelText.includes("Password") ? (
                <SecondaryButton buttonText="Forgot Password?" buttonLink="RetrievePassword" />
            ) : ""
        }
        {
            errors ? (
                <ErrorText>{ errors }</ErrorText>
            ) : ""
        }
    </View>
  )
}

const styles = StyleSheet.create({
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
})
