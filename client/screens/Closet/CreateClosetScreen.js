import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CreateClosetScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text>CreateClosetScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'yellow',
    }
})
