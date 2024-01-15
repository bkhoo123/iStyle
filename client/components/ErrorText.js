import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ErrorText({ children }) {
    console.log("children", children);
  return (
    <View style={styles.errorContainer}>
        { Array.isArray(children) ? (children.map( (child, idx) => (
            <Text
                key={`${child}${idx}`}
                style={styles.errorText}
            >
            { child }
            </Text>
        ))) : (
            <Text
                style={styles.errorText}
            >
                { children }
            </Text>
        )
        }
    </View>
  )
}

    // <Text style={styles.errorText}>
    //   { children }
    // </Text>
const styles = StyleSheet.create({
    errorContainer: {
        paddingBottom: 8,
        flexDirection: 'column',
    },
    errorText: {
        color: 'red',
    }
})
