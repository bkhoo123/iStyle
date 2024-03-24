import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Closet from '../components/Closet/Closet'
import { useSelector } from 'react-redux'

export default function HomeScreen() {
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    console.log("user", user);
  }, [])
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
