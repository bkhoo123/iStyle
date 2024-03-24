import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SocialButton from './SocialButton';
import { FontAwesome } from '@expo/vector-icons';

const googleClientId = process.env.GOOGLE_CLIENT_ID;


export default function GoogleLogin({ onLogin }) {

    const handleSignIn = async () => {
        try {
            const { type, user } = await GoogleLogin.logInAsync({
                clientId: googleClientId,
                scopes: ['profile', 'email'],
            });

            if (type === 'success') {
                onLogin(user);
            }
        } catch (error) {
            console.error('Google login error:', error);
        }
    }

  return (
    <View>
        <SocialButton
            buttonText="Sign in with Google"
            onPress={handleSignIn}
        >
            <FontAwesome name="google" size={24} color="black" />
        </SocialButton>
    </View>
  )
}

const styles = StyleSheet.create({})
