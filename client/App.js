import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			{/* <StackNavigator style={styles.rootContainer} /> */}
			<Navigation style={styles.rootContainer} />
		</Provider>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
});
