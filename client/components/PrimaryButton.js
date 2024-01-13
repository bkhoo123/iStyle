import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette'

export default function PrimaryButton({ onPress, buttonText }) {
  return (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed ? styles.pressed : ""}
        android_ripple={{ color: Palette.border }}
    >
        {/* to-do: google button */}
        <View
            style={styles.buttonGroup}
        >
            <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>{ buttonText }</Text>
            </View>
        </View>
        {/* to-do: facebook button */}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonGroup: {
        backgroundColor: Palette.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginHorizontal: 25,
        marginTop: 12,
        borderWidth: 1,
        borderColor: Palette.primary,
    },
    buttonText: {
        color: Palette.background,
        fontSize: 16,
    },
    pressed: {
        opacity: 0.75
    }
})
