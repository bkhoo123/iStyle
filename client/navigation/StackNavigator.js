import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import LogInScreen from "../screens/LogInScreen";
import Palette from "../constants/Palette";
import SignUpScreen from "../screens/SignUpScreen";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function StackNavigator() {
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

	const Stack = createNativeStackNavigator();
	const Tab = createMaterialTopTabNavigator();
	return (
		<NavigationContainer style={styles.screen} onLayout={onLayoutRootView}>
            <SafeAreaView style={styles.screen}>
                {/* to-do: replace with iStyle logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/iStyleLogo_Text.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Tab.Navigator
                    screenOptions={{
                        sceneContainerStyle: { backgroundColor: '#f0f0f0' },
                        tabBarIndicatorStyle: { backgroundColor: Palette.primary },
                    }}
                >
                    <Tab.Screen
                        name="LogIn"
                        component={LogInScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            </SafeAreaView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 0,
    },
    header: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 800,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
    },
    logo: {
        height: 50,
    }
});
