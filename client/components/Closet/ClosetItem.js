import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../../constants/Palette'

export default function ClosetItem({ isLastChild }) {

  if (isLastChild) {
    return (
      <View style={[ styles.closetItemContainer ]}>
        {/* to-do: render closet item image */}
        {/* to-do: first closet item should not have left border */}
        {/* to-do: last closet item should not have right border */}
        <Text>Closet Item</Text>
      </View>
    )
  }
  return (
    <View style={ [ styles.closetItemContainer, styles.rightBorder ] }>
      {/* to-do: render closet item image */}
      {/* to-do: first closet item should not have left border */}
      {/* to-do: last closet item should not have right border */}
      <Text>Closet Item</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  closetItemContainer: {
    width: 120,
    height: 180,
    borderColor: Palette.border,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBorder: {
    borderRightWidth: 1,
  },
})
