import Button, { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import UsersStack from './UsersStack';
import ProfileStack from './ProfileStack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../ApiService';
const Drawer = createDrawerNavigator();

export default function MyDrawer({ onLogout }) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const { logout } = useContext(AuthContext);
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
        AsyncStorage.removeItem('token')
        logout
        // .then(() => {
        //     onLogout();
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'Login' }],
        //     });
        // });
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <Drawer.Navigator initialRouteName="HomeStack" drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="My Profile"
                        onPress={() => navigation.navigate('Profile', { screen: 'myProfile', params: { message: null } })}
                    />
                    <DrawerItem
                        label="Posts"
                        onPress={() => { navigation.navigate('HomeStack', { screen: 'Home', params: { search: null } }) }}
                    />
                    {data.type == 1 &&
                        <DrawerItem
                            label="Users"
                            onPress={() => navigation.navigate('Users', {
                                screen: 'UserList', params: {
                                    searchname: null,
                                    searhemail: null,
                                    craetefrom: '',
                                    createto: '',
                                }
                            })}
                        />
                    }
                    <DrawerItem label="Logout" onPress={logout} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="HomeStack" initialParams={{ screen: 'Home' }} component={HomeStack} options={{
                drawerLabel: 'Posts',
                headerLeft: null,
                headerTitle: 'Posts',
                drawerItemStyle: { height: 0 }
            }} />
            {data.type == 1 &&
                <Drawer.Screen name='Users' initialParams={{ screen: 'UserList' }} component={UsersStack} options={{
                    drawerItemStyle: { height: 0 }
                }} />
            }
            <Drawer.Screen name="Profile" initialParams={{ screen: 'MyProfile' }} component={ProfileStack} options={{
                drawerItemStyle: { height: 0 }
            }} />
        </Drawer.Navigator>
    )
        ;
}