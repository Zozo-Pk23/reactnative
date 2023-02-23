import Button, { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import UsersStack from './UsersStack';
import ProfileStack from './ProfileStack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

export default function MyDrawer({ onLogout }) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://172.20.80.99:8000/api/getUser`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            setData(response.data.user);
            console.log(response.data.user.type);
        } catch (error) {
            if (error.response === 429) {
                console.log('Too many requests, try again later.');
            } else {
                console.error(error);
            }
        }
    };
    function handleLogout() {
        AsyncStorage.removeItem('token').then(() => {
            onLogout();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        });
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={() => handleLogout()} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{
                drawerLabel: 'Posts',
            }} />
            {data.type == 1 &&
                <Drawer.Screen name='Users' component={UsersStack}



                />
            }
            <Drawer.Screen name="Profile" component={ProfileStack} />
        </Drawer.Navigator>
    )
        ;
}