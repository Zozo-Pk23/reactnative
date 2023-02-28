import React, { useState, useEffect, useContext } from 'react';
import LoginScreen from '../screens/LoginScreen';
import MyDrawer from './DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../ApiService';
import ForgotPasswordScreen from '../profile/ForgotPassword';
const Stack = createStackNavigator();
const MainStack = ({ route, navigation }) => {
    const { userInfo } = useContext(AuthContext);
    console.log(userInfo);
    const [token, setToken] = useState(null);

    // function handleLogin(token) {
    //     AsyncStorage.setItem('token', token).then(() => {
    //         setToken(token);
    //     });
    // }
    // function handleLogout() {
    //     AsyncStorage.removeItem('token').then(() => {
    //         setToken(null);
    //     });
    // }
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (token) {
                setToken(token);
            }
        });
    }, []);
    return (
        <NavigationContainer>
            {token ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='MyDrawer' component={MyDrawer} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Group>
                        <Stack.Screen name='Login' component={LoginScreen} />
                        <Stack.Screen name='Forgot' component={ForgotPasswordScreen} />
                    </Stack.Group>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

export default MainStack;