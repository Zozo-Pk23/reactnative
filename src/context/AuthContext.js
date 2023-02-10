import axios from "axios";
import { AsyncStorage } from 'react-native';
import React, { createContext, useState } from "react";
import { BASE_URL } from "../config";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const login = (email, password) => {
        setIsLoading(true);
        console.log(email,password);
        axios.post(`${BASE_URL}`, {
            email,password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        }).catch(e => {
            console.log(`login error $(e)`);
        })
    }
    return (
        <AuthContext.Provider value={{ isLoading, userInfo, login }}>{children}</AuthContext.Provider>
    )
}
