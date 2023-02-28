import axios from "axios";
import { BASE_URL } from "./Api";
import React, { createContext, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
var RNFS = require('react-native-fs');
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState({});
    const [userInfo, setuserInfo] = useState({});
    const [posts, setposts] = useState({});
    const login = async (email, password) => {
        setloading(true);
        console.log(email, password);
        try {
            const response = await fetch(`${BASE_URL}/login`, {
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
                setuserInfo(data);
            } else {
                seterror(data.message);
                setloading(false);
                setuserInfo({});
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const logout = async () => {
        setuserInfo({});
        seterror({});
        setloading(false);
        AsyncStorage.removeItem('token');
    };
    return (
        <AuthContext.Provider
            value={{ setloading, login, logout, error, loading, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}