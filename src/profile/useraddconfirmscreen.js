import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
const UserAddConfirm = ({ route, navigation }) => {

    const create = async (data) => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`http://172.20.80.99:8000/api/profile/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            navigation.navigate('UserList', { setloading: true })
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f0ffff', padding: 20, marginHorizontal: 30, marginVertical: 10, borderRadius: 40, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View><Text>Profile:</Text></View>
                    <Avatar rounded size={100} source={{ uri: route.params.selectedImage.assets[0].uri }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Name</Text><Text>{route.params.name}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Email</Text><Text>{route.params.email}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Password</Text><Text>{route.params.password}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Type</Text><Text>{route.params.type == 1 ? 'Admin' : 'User'}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Phone Number</Text><Text>{route.params.phone}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Birthday</Text><Text>{route.params.selectedDate.toLocaleDateString()}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text>Address</Text><Text>{route.params.address}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Button title="Go back" onPress={() => navigation.goBack()} />
                    </View>
                    <View>
                        <Button title="Confrim" onPress={() => create(route.params)} />
                    </View>
                </View>
            </View>
        </View>
    )
}
export default UserAddConfirm;