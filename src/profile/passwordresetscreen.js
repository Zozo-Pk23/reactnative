import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNRestart from 'react-native-restart';
import api from '../api/api';
export default function PasswordReset({ onLogout, navigation }) {
    const [password, setpassword] = useState(null);
    const [newpassword, setnewpassword] = useState(null);
    const [confirmpassword, setconfirmpassword] = useState(null);
    const [data, setData] = useState([]);
    const [error, seterror] = useState({});
    const confirm = async (data, password, newpassword, confirmpassword) => {
        api.ForgotPassword(data)
            .then(resData => {
                seterror(resData.message);
                if (resData.user) {
                    AsyncStorage.removeItem('token');
                    alert('Password Change successfully');
                    RNRestart.restart();
                }
            })
    }

    useEffect(() => {
        api.getProfile().then((data) => {
            setData(data);
        });
    }, [])
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'brown', }}>Password reset screen</Text>
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10 }} placeholder="Enter your password" value={password} onChangeText={text => setpassword(text)} />

            {error.oldpassword && (
                <Text style={{ color: 'red' }}>{error.oldpassword}</Text>
            )}
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10 }} placeholder="Enter your new password" value={newpassword} onChangeText={text => setnewpassword(text)} />
            {error.newpassword && (
                <Text style={{ color: 'red' }}>{error.newpassword}</Text>
            )}
            <TextInput style={{ paddingLeft: 20, borderRadius: 30, width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10 }} placeholder="Confirm your password" value={confirmpassword} onChangeText={text => setconfirmpassword(text)} />
            {error.password_confirmation && (
                <Text style={{ color: 'red' }}>{error.password_confirmation}</Text>
            )}
            <TouchableOpacity onPress={() => confirm({ data, password, newpassword, confirmpassword })} style={{ borderRadius: 30, width: '40%', borderWidth: 0.3, marginBottom: 10, marginTop: 10, height: 50, backgroundColor: 'cyan', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'black' }}>Change Password</Text></TouchableOpacity>
        </View>
    )
}