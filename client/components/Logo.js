import { StyleSheet, Text, View, Image } from 'react-native'


export default function Logo() {
  return (
    <View>
        <Image source={require("../assets/iStyleLogo_Text.png")} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
	logo: {
		height: 50,
	},
})
