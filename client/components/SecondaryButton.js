import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Palette from '../constants/Palette';

export default function SecondaryButton({ buttonText, buttonLink }) {
    const navigation = useNavigation();

  return (
    <Pressable
        onPress={() => navigation.navigate(`${buttonLink}`)}
    >
        <Text style={styles.secondaryButtonText}>{ buttonText }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    secondaryButtonText: {
      textAlign: 'right',
      color: Palette.primary,
      textDecorationLine: 'underline',
    }
})
