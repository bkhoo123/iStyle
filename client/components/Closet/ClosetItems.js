import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClosetItem from './ClosetItem'
import Palette from '../../constants/Palette'

export default function ClosetItems() {
  const closetItems = ["item1", "item2", "item3", "item4"]
  return (
    <FlatList
      data={closetItems}
      renderItem={({ item, idx }) => (
        <ClosetItem key={`closetItem-${idx}`} isLastChild={ (idx === closetItems.length - 1) ? true : false } />
      ) }
      horizontal={true}
      style={styles.closetItemsContainer}
    />
  )
}

const styles = StyleSheet.create({
  closetItemsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Palette.border,
    height: 180,
    width: 'max-content',

  }
})
