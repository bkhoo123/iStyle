import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClosetItem from './ClosetItem'
import Palette from '../../constants/Palette'

export default function ClosetItems() {
  const closetItems = ["item1", "item2", "item3", "item4"]
  return (
    // to-do: add scroll view
    <View style={styles.closetItemsContainer}>
        {/* to-do: map out each ClosetItem */}
      { closetItems.length ? closetItems.map((closetItem, i) => (
        <ClosetItem key={`closetItem-${i}`} isFirstChild={ i === 0 ? true : false } isLastChild={ (i === closetItems.length - 1) ? true : false } />
      )) : ""}
    </View>
  )
}

const styles = StyleSheet.create({
  closetItemsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Palette.border,
    height: 180,
    width: 'max-content',
    // alignContent: 'flex-start',
    justifyContent: 'flex-start',

  }
})
