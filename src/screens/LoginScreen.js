import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dialog } from "@rneui/base";
import React, { useContext, useState } from "react";
import { Button, Text, View, TextInput, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setloading] = useState(false);
    const [token, setToken] = useState(null);
    const [error, seterror] = useState({});
    const [errors, seterrors] = useState({});
    const navigation = useNavigation();
    const handleLogin = async () => {
        setloading(true);
        try {
            const response = await fetch('http://172.20.80.99:8000/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'email': email, 'password': password })
            })
            const data = await response.json();
            if (data.success) {
                await AsyncStorage.setItem('token', data.token);
                setloading(false);
                const token = data.token
                onLogin(token);
            } else {
                seterror(data.message);
                setloading(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Dialog isVisible={loading} overlayStyle={{ backgroundColor: "#fff" }}>
                <Dialog.Loading />
            </Dialog>
            <View style={{ marginTop: 250 }}>
                <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="Enter your email address" style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} />
                {error.email && (
                    <Text style={{ color: 'red' }}>{error.email}</Text>
                )}
                <TextInput value={password} onChangeText={text => setPassword(text)} placeholder="Enter your password" secureTextEntry style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} />
                {error.password && (
                    <Text style={{ color: 'red' }}>{error.password}</Text>
                )}
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLogin}
                        style={{ borderRadius: 30, borderWidth: 1, width: 200, marginBottom: 10, marginTop: 10, height: 50, backgroundColor: 'cyan', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                    <View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                        <Text style={{ color: 'blue' }}>Forgot password???</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default LoginScreen;
