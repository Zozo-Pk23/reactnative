import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNRestart from 'react-native-restart';
export default function PasswordReset({ onLogout, navigation }) {
    const [password, setpassword] = useState(null);
    const [newpassword, setnewpassword] = useState(null);
    const [confirmpassword, setconfirmpassword] = useState(null);
    const [data, setData] = useState([]);
    const [error, seterror] = useState({});
    const getPasswod = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://172.20.80.99:8000/api/getUser`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            setData(JSON.stringify(response.data.user));
            console.log(JSON.stringify(response.data.user));
        } catch (error) {
            if (error.response === 429) {
                console.log('Too many requests, try again later.');
            } else {
                console.error(error);
            }
        }
    };
    const confirm = async () => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`http://172.20.80.99:8000/api/profile/passwordreset`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data, oldpassword: password, newpassword: newpassword, password_confirmation: confirmpassword })
        }).then(res => res.json())
            .then(resData => {
                console.log(resData.message);
                seterror(resData.message);
                if (resData.user) {
                    AsyncStorage.removeItem('token');
                    alert('Password Change successfully');
                    RNRestart.restart();
                }
            })
    }

    useEffect(() => {
        getPasswod();
    }, [])
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'brown', }}>Password reset screen</Text>
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} placeholder="Enter your password" value={password} onChangeText={text => setpassword(text)} />

            {error.oldpassword && (
                <Text style={{ color: 'red' }}>{error.oldpassword}</Text>
            )}
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} placeholder="Enter your new password" value={newpassword} onChangeText={text => setnewpassword(text)} />
            {error.newpassword && (
                <Text style={{ color: 'red' }}>{error.newpassword}</Text>
            )}
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} placeholder="Confirm your password" value={confirmpassword} onChangeText={text => setconfirmpassword(text)} />
            {error.password_confirmation && (
                <Text style={{ color: 'red' }}>{error.password_confirmation}</Text>
            )}
            <TouchableOpacity onPress={() => confirm({ data, password, newpassword, confirmpassword })} style={{ borderRadius: 30, width: '40%', borderWidth: 1, marginBottom: 10, marginTop: 10, height: 50, backgroundColor: 'cyan', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'black' }}>Change Password</Text></TouchableOpacity>
        </View>
    )
}