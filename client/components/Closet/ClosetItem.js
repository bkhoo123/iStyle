import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Palette from '../../constants/Palette'

export default function ClosetItem({ isFirstChild, isLastChild }) {
  if (isFirstChild) {
    return (
      <View style={ isFirstChild ? styles.closetItemContainer : [ styles.closetItemContainer, styles.verticalBorders ]}>
        {/* to-do: render closet item image */}
        {/* to-do: first closet item should not have left border */}
        {/* to-do: last closet item should not have right border */}
        <Text>Closet Item</Text>
      </View>
    )
  }
  return (
    <View style={ isFirstChild ? styles.closetItemContainer : [ styles.closetItemContainer, styles.verticalBorders ]}>
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
    // flex: 1,
  },
  verticalBorders: {
    borderColor: Palette.border,
    // borderLeftWidth: 1,
    borderRightWidth: 1,
  }
})
