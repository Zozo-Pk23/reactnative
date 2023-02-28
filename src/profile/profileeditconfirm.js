import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Image } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import api from '../api/api';
import { BASE_URL } from '../../Api';
const ProfileEditConfirm = ({ route, navigation }) => {
    const [data, setData] = useState({});
    const imageSource = route.params.name.selectedImage[0]
        ? { uri: `http://172.20.80.99:8000/storage/` + route.params.name.selectedImage }
        : { uri: route.params.name.selectedImage['assets'][0]['uri'] };
    const create = async () => {
        api.Edit(route.params.name)
            .then(() => {
                if (data.type == route.params.name.value) {
                    navigation.navigate('myProfile', { setloading: true, success: true })
                } else {
                    RNRestart.restart();
                }
            })
    }
    useEffect(() => {
        api.getProfile().then((data) => {
            setData(data);
        });
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                    <View>
                        <TouchableOpacity style={{
                            backgroundColor: "yellow", borderRadius: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            elevation: 2,
                        }} onPress={() => navigation.goBack()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            backgroundColor: "#34eb9e", borderRadius: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            elevation: 2,
                        }} onPress={() => create()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
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