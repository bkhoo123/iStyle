import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClosetItems from './ClosetItems'
import Header from '../Header'

export default function Closet({ closetName, closetItems }) {
  return (
    <View>
        <Header />
        {/* to-do: Closet name */}
        <Text style={styles.headerText}>Closet name</Text>
        {/* to-do: ClosetItems component */}
        <ClosetItems />
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
      fontFamily: 'Montserrat_600SemiBold',
      fontSize: 22,
      marginTop: 26,
      marginLeft: 18,
      marginBottom: 18
  },
})
