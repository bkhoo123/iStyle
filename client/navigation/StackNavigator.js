import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import LogInScreen from "../screens/LogInScreen";
import Palette from "../constants/Palette";
import SignUpScreen from "../screens/SignUpScreen";

export default function StackNavigator() {
	const Stack = createNativeStackNavigator();
	const Tab = createMaterialTopTabNavigator();
	return (
		<NavigationContainer>
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
