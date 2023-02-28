import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../api/api';
const UserAddConfirm = ({ route, navigation }) => {
    const create = async (data) => {
        api.create(data)
            .then(
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
                        }} onPress={() => create(route.params)}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default UserAddConfirm;