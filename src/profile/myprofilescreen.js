import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyProfile = ({ navigation }) => {
    const [data, setData] = useState([]);
    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://10.0.2.2:8000/api/getUser`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            setData(response.data.user);
            console.log(response.data.user.name);
        } catch (error) {
            if (error.response === 429) {
                console.log('Too many requests, try again later.');
            } else {
                console.error(error);
            }
        }
    };
    const edit = (data) => {
        navigation.navigate('editProfile', { data });
    }

    useEffect(() => {
        getProfile();
    }, [])
    return (
        <View>
            <Text>User Profile</Text>
            <Text>Name:{data.name}</Text>
            <Text>Email:{data.email}</Text>
            <Text>Type:{data.type}</Text>
            <Text>Phone:{data.phone}</Text>
            <Text>Date of Birth:{data.date_of_birth}</Text>
            <Text>Address:{data.address}</Text>
            <Button title='Edit' onPress={() => edit({ data })} />
        </View>
    )

}
export default MyProfile;