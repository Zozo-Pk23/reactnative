import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Image } from 'react-native-elements';
import { create } from 'react-test-renderer';
const ProfileEditConfirm = ({ route, navigation }) => {
    //console.log(route.params.name);

    const create = async () => {
        await fetch(`http://10.0.2.2:8000/api/profile/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route.params.name)
        })
    }
    return (
        <View style={{ display: "flex" }}>
            <Text>Hello</Text>
            {/* <View style={{ flexDirection: 'row' }}><View><Text>Profile Image</Text></View><View style={{ marginLeft: 200 }}><Avatar rounded size={130} source={{ uri: route.params.selectedImage.assets[0].uri }} /></View></View> */}
            <View style={{ flexDirection: 'row' }}><View><Text>Name</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.name}</Text></View></View>
            <View style={{ flexDirection: 'row' }}><View><Text>Email</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.email}</Text></View></View>
            <View style={{ flexDirection: 'row' }}><View><Text>Phone</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.phone}</Text></View></View>
            <View style={{ flexDirection: 'row' }}><View><Text>Type</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.value}</Text></View></View>
            <View style={{ flexDirection: 'row' }}><View><Text>Date of Birth</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.selectedDate.toLocaleDateString()}</Text></View></View>
            <View style={{ flexDirection: 'row' }}><View><Text>Address</Text></View><View style={{ marginLeft: 200 }}><Text>{route.params.name.address}</Text></View></View>
            <View style={{ flexDirection: 'row', marginTop: 160, }}>
                <View>
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                </View>
                <View style={{ marginLeft: 200 }}>
                    <Button title="Confrim" onPress={() => create()} />
                </View>
            </View>
        </View>
    )
}
export default ProfileEditConfirm;