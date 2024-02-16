import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import LogInScreen from "../screens/LogInScreen";
import Palette from "../constants/Palette";
import SignUpScreen from "../screens/SignUpScreen";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "../screens/HomeScreen";
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
=======
import { Ionicons, AntDesign } from '@expo/vector-icons';
>>>>>>> main
import Header from "../components/Header";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "../store/session";
<<<<<<< HEAD
=======
import CreateClosetScreen from "../screens/Closet/CreateClosetScreen";
>>>>>>> main

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
<<<<<<< HEAD
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
=======
				{/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
				<Stack.Screen name="CreateCloset" component={CreateClosetScreen} options={{ headerShown: false }} />
>>>>>>> main
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
<<<<<<< HEAD
=======
			<BottomTabs.Screen
				name="CreateCloset"
				component={CreateClosetScreen}
				options={{
					headerShown: false,
					tabBarLabel: 'Create Closet',
					tabBarIcon: ({ focused, color }) => (
						<AntDesign name="pluscircle" size={24} color="black" />
					),
				}}
			/>
>>>>>>> main
		</BottomTabs.Navigator>
	)
}

export default function Navigation() {
	const dispatch = useDispatch();
	// FOR TESTING:
    // const user = false;
	const userIsLoggedIn = useSelector((state) => state.session.isLoggedIn);
    const isLoaded = true;

	useEffect(() => {
		dispatch(restoreUser());
	}, [userIsLoggedIn]);

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
                    userIsLoggedIn ? (
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
