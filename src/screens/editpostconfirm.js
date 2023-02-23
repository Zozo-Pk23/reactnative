import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
const EditPostConfirm = ({ route, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const edit = async () => {
        const token = await AsyncStorage.getItem('token');
        await fetch('http://172.20.80.99:8000/api/blogs/update', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route.params)
        }).then(navigation.navigate('Home', { setloading: true }))
    }
    useEffect(() => {
        if (route.params.id.status == 1) {
            setIsEnabled(true);
        }
    }, []);
    return (
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 50
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Title</Text>
                <Text style={{ fontSize: 16 }}>{route.params.id.title}</Text>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Description</Text>
                <Text style={{ fontSize: 16 }}>{route.params.id.description}</Text>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Status</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    value={isEnabled}
                    disabled
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={() => edit()}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default EditPostConfirm;