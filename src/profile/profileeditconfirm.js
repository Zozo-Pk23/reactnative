import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Image } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import RNRestart from 'react-native-restart';
import axios from 'axios';
const ProfileEditConfirm = ({ route, navigation }) => {
    const [data, setData] = useState({});
    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://172.20.80.99:8000/api/getUser`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            setData(response.data.user);
            console.log(data.type);
        } catch (error) {
            if (error.response === 429) {
                console.log('Too many requests, try again later.');
            } else {
                console.error(error);
            }
        }
    };
    const imageSource = route.params.name.selectedImage[0]
        ? { uri: 'http://172.20.80.99:8000/storage/' + route.params.name.selectedImage }
        : { uri: route.params.name.selectedImage['assets'][0]['uri'] };
    const create = async () => {
        if (typeof route.params.name.selectedImage === 'object') {
            console.log(' is array');
            const token = await AsyncStorage.getItem('token');
            const base64 = await RNFetchBlob.fs.readFile(route.params.name.selectedImage['assets'][0]['uri'], 'base64');
            //console.log(route.params.name.selectedImage);
            await fetch(`http://172.20.80.99:8000/api/profile/update`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: route.params.name, newphoto: base64 })
            })
                .then(() => {
                    if (data.type == route.params.name.value) {
                        navigation.navigate('myProfile', { setloading: true })
                    } else {
                        RNRestart.restart();
                    }
                })
        }
        else {
            console.log('is not array');
            const token = await AsyncStorage.getItem('token');
            await fetch(`http://172.20.80.99:8000/api/profile/update`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: route.params.name })
            })
                .then(() => {
                    if (data.type == route.params.name.value) {
                        navigation.navigate('myProfile', { setloading: true })
                    } else {
                        RNRestart.restart();
                    }
                })
        }
    }
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f0ffff', padding: 20, marginHorizontal: 30, marginVertical: 10, borderRadius: 40, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View><Text>Profile:</Text></View>
                    <Avatar rounded size={100}
                        source={imageSource}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Name</Text><Text>{route.params.name.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Email</Text><Text>{route.params.name.email}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Type</Text><Text>{route.params.name.value == 1 ? 'Admin' : 'User'}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Phone Number</Text><Text>{route.params.name.phone}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Birthday</Text><Text>{route.params.name.dateone}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Address</Text><Text>{route.params.name.address}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-around', marginVertical: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: 'blue', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 20 }} onPress={() => navigation.goBack()}><Text style={{ color: '#ffffff' }}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.color]} onPress={() => create()}><Text style={{ color: '#000000' }}>Confirm</Text></TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: 100,
        elevation: 2,
        alignItems: 'center',
    },
    color: {
        backgroundColor: 'lightgreen',
    },
});
export default ProfileEditConfirm;