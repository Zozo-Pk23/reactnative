import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from "@rneui/base";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
const MyProfile = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    const getProfile = async () => {
        setloading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://172.20.80.99:8000/api/getUser`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            setData(response.data.user);
            console.log(response.data.user.name);
            setloading(false);
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
        if (route.params?.setloading) {
            setloading(true);
        }
    }, [route.params]);
    return (
        <View style={{ flex: 1 }}>
            <Dialog isVisible={loading} overlayStyle={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                <Dialog.Loading />
            </Dialog>
            <View style={{ flex: 1, backgroundColor: '#f0ffff', padding: 20, marginHorizontal: 30, marginVertical: 10, borderRadius: 40, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View><Text>Profile:</Text></View>
                    <Avatar rounded size={100}
                        source={data ? ({ uri: 'http://172.20.80.99:8000/storage/' + data.profile }) :
                            ({ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT2VEmIR68pPnPgko_LL5shFwfUOuAhX0JAx_CIVhohEWoArcpr9H2VXPgZRiy3_1UIGhiwd8xnqMgdtNA' })}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Name</Text><Text>{data.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Email</Text><Text>{data.email}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Type</Text><Text>{data.type == 1 ? 'Admin' : 'User'}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Phone Number</Text><Text>{data.phone}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Birthday</Text><Text>{data.date_of_birth}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Address</Text><Text>{data.address}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-around', marginVertical: 10 }}>
                    <TouchableOpacity style={[styles.button, styles.color]} onPress={() => edit({ data })}><Text style={{ color: '#000000' }}>Edit</Text></TouchableOpacity>
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
        backgroundColor: 'yellow',
    },
});

export default MyProfile;