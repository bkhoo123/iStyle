import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import Palette from '../constants/Palette';

export default function SocialButton({ buttonText, children, onPress }) {
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
            <View style={styles.iconContainer}>
                { children }
            </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 25,
        marginTop: 18,
        borderWidth: 1,
        borderColor: Palette.primary,
    },
    iconContainer: {
        marginRight: 12,
        width: 24,
        height: 24,
    },
    buttonTextContainer: {
        flex: 1,
    },
    pressed: {
        opacity: 0.75
    },
    buttonText: {
        fontSize: 16,
    }
});
