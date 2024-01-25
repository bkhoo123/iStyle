import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Closet from '../components/Closet/Closet'

export default function HomeScreen() {
  return (
    <View style={styles.rootContainer}>
      {/* to-do: map out closets */}
      <Closet />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
})
