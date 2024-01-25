import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import React from 'react'
import ErrorText from './ErrorText'
import Palette from '../constants/Palette'
import RNPickerSelect from 'react-native-picker-select';
import SecondaryButton from './SecondaryButton';

export default function Input({ labelText, placeholderText, inputValue, handleTextChange, errors, inputType, genderOptions, isLogin }) {

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
                <View style={styles.dropdown}>
                    <RNPickerSelect
                        placeholder={placeholderText}
                        items={genderOptions}
                        value={inputValue}
                        onValueChange={handleTextChange}
                        style={pickerSelectStyles}
                    />
                </View>
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
            labelText.includes("Password") && isLogin ? (
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
    dropdown: {
        padding: 16,
        borderWidth: 1,
        borderColor: Palette.primary,
        marginVertical: 10,
    }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
  },
  inputAndroid: {
    fontSize: 16,
  },
});
