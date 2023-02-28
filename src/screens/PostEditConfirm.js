import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import postapi from '../api/postapi';
const EditPostConfirm = ({ route, navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const edit = async () => {
        postapi.edit(route.params)
            .then(navigation.navigate('Home', { setloading: true }))
    }
    useEffect(() => {
        if (route.params.id.status == 1) {
            setIsEnabled(true);
        }
    }, []);
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', marginTop: 50
            }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginRight: 20, fontSize: 20 }}>Title</Text>
                </View>
                <View style={{ alignContent: 'flex-start', width: '45%' }}>
                    <Text style={{ fontSize: 16 }}>{route.params.id.title}</Text></View>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{ width: '50%' }}>

                    <Text style={{ alignSelf: 'flex-start', marginRight: 20, fontSize: 20 }}>Description</Text>
                </View>
                <View style={{ alignContent: 'flex-start', width: '45%' }}>
                    <Text style={{ fontSize: 16 }}>{route.params.id.description}</Text></View>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>

                <View style={{ width: '50%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginRight: 20, fontSize: 20 }}>Status</Text></View>
                <View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        value={isEnabled}
                        disabled
                    /></View>
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
                    }} onPress={() => edit()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default EditPostConfirm;