import { StyleSheet, Text } from 'react-native'


export default function CustomText({ text }) {
	// to-do: create custom Text component for default font family and size
  return (
    <Text style={styles.default}>
      { text }
    </Text>
  )
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    }
})
