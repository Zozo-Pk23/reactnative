import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { Button, Text, View, TextInput, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from "../context/AuthContext";
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    login = async () => {
        try {
            await fetch('http://10.0.2.2:8000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': email, 'password': password })
            }).then(res => res.json())
                .then(resData => {
                    alert(JSON.stringify(resData.message));
                    AsyncStorage.setItem('token', resData.token);
                })
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <View>
            {/* <ActivityIndicator visible={isLoading} /> */}
            <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter your email address" />
            <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter your password" secureTextEntry />
            <Button title="Login" onPress={login} />
        </View>
    )
}
export default LoginScreen;
