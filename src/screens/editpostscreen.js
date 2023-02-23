import { View, Text, Button, Switch } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PostEditScreen = ({ route, navigation }) => {
    const [title, setTitle] = useState(route.params.title);
    const [description, setDescription] = useState(route.params.description);
    const [id, setId] = useState(route.params.id);
    const [status, setStatus] = useState(route.params.status);
    const [isEnabled, setIsEnabled] = useState(false);
    const [error, seterror] = useState({});
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            setStatus(0)
        } else {
            setStatus(1)
        }
    }
    const Clear = () => {
        setTitle(' ');
        setDescription(' ');
        seterror('');
    }
    const Confirm = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetch(`http://172.20.80.99:8000/api/blogs/edit`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            }).then(res => res.json()).
                then(resData => {
                    if (resData.success) {
                        navigation.navigate('ConfirmEdit', { id });
                    } else {
                        seterror(resData.message)
                    }
                })

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (route.params.status == 1) {
            setIsEnabled(true);
        }
    }, []);
    return (
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Edit Form</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Title</Text>
                <TextInput onChangeText={text => setTitle(text)}
                    value={title}
                    style={{
                        backgroundColor: '#fff',
                        marginVertical: 10,
                        borderRadius: 30,
                        alignItems: 'center',
                        width: '50%',
                        borderWidth: 1,
                        fontSize: 16
                    }} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                {error.title && (
                    <Text style={{ color: 'red' }}>{error.title}</Text>
                )}
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: "space-between"
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Description</Text>
                <TextInput onChangeText={text => setDescription(text)} numberOfLines={4} multiline={true} value={description}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        width: '50%',
                        borderWidth: 1,
                        fontSize: 16
                    }} />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                {error.description && (
                    <Text style={{ color: 'red' }}>{error.description}</Text>
                )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Status</Text>
                <View style={{ justifyContent: 'center' }}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={Clear}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={() => Confirm({ id, title, description, status })}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default PostEditScreen;