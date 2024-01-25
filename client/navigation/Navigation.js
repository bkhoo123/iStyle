import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import LogInScreen from "../screens/LogInScreen";
import Palette from "../constants/Palette";
import SignUpScreen from "../screens/SignUpScreen";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons';
import Header from "../components/Header";
import Logo from "../components/Logo";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
	return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.logoContainer}>
            <Logo />
            </View>
            <Stack.Navigator style={styles.container}>
                <Stack.Screen
                    name="TopTabNavigator"
                    component={TopTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={LogInScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaView>
	);
}

function AuthenticatedStack() {
	return (
        <SafeAreaView style={styles.screen}>
			<Header />
			<Stack.Navigator>
				<Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			</Stack.Navigator>
		</SafeAreaView>
	);
}

function TopTabNavigator() {
    return (
        <TopTabs.Navigator
            screenOptions={{
                sceneContainerStyle: { backgroundColor: "#f0f0f0" },
                tabBarIndicatorStyle: { backgroundColor: Palette.primary },
            }}
        >
            <TopTabs.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
            <TopTabs.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </TopTabs.Navigator>
    )
}

function BottomTabNavigator() {
	return (
		<BottomTabs.Navigator
			screenOptions={{
				tabBarActiveTintColor: Palette.primary,
				tabBarInactiveTintColor: 'grey',
				tabBarStyle: [{
					paddingTop: 8
				}]
			}}
		>
			<BottomTabs.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused, color }) => (
						<Ionicons name="ios-home" size={24} color={color} focused={focused} />
					),
				}}
			/>
		</BottomTabs.Navigator>
	)
}

export default function Navigation() {

	// FOR TESTING:
    // const user = false;
	const user = useSelector((state) => state.session.user);
	console.log("USER!!:", user);
    const isLoaded = true;

    const [fontsLoaded, fontError] = useFonts({
		Montserrat_400Regular,
		Montserrat_600SemiBold,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}




	return isLoaded ? (
            <NavigationContainer style={styles.screen} onLayout={onLayoutRootView}>

                {
                    user ? (
                        <AuthenticatedStack />
                    ) : (
                        <AuthStack />
                    )
                }
            </NavigationContainer>
	) : (
		<LoadingOverlay />
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		margin: 0,
	},
	header: {
		textAlign: "center",
		fontSize: 28,
		fontWeight: 800,
	},
	logoContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 12,
		borderBottomWidth: 1,
	},
});
