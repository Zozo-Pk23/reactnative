import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://172.20.80.99:8000/api/profile/forgotpassword', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            }).then(
                setMessage("Password Reset link has sent successfully"))
        } catch (error) {
            setMessage('Unable to send password reset link');
        }
    }

    return (
        <View style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
            <Text style={{ fontSize: 32, color: 'brown', fontWeight: 'bold' }}>Enter your email to reset your password</Text>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={{ width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10 }}
            />
            <TouchableOpacity onPress={handleResetPassword}
                style={{ width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10, height: 50, backgroundColor: 'cyan', alignItems: 'center', justifyContent: 'center' }}
            >
                <Text>Reset Password</Text>
            </TouchableOpacity>
            <Text>{message}</Text>
        </View>
    );
};

export default ForgotPasswordScreen;