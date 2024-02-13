import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Palette from '../constants/Palette';

export default function ActionBar(onSave) {
	const navigation = useNavigation();
  return (
    <View style={styles.actionButtonsContainer}>
        {/* to-do: cancel & save buttons */}
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer
                }
                onPress={() => navigation.goBack()}
                android_ripple={{ color: Palette.primary }}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
        </View>
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) =>
                    pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer
                }
                onPress={onSave}
                android_ripple={{ color: Palette.primary }}
            >
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    actionButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 18,
		width: "100%",
	},
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
    },
    buttonInnerContainer: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: Palette.primary,
        textAlign: "center",
        fontSize: 16,
        textTransform: "uppercase"
    },
    pressed: {
        opacity: 0.75,
    },
})
