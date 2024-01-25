import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from './Logo'
import { Ionicons } from '@expo/vector-icons';
import Palette from '../constants/Palette';

export default function Header() {
  return (
    <View style={styles.rootContainer}>
        <Logo />
        <Ionicons name="person-circle-outline" size={32} color="black" />

    </View>
  )
}

const styles = StyleSheet.create({
    rootContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
        paddingBottom: 8,
        borderBottomColor: Palette.border,
        borderBottomWidth: 1,
    },
})
