import { View, Text, Button, Switch } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postapi from '../api/postapi';
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
        postapi.ConfirmEdit(id)
            .then(res => res.json()).
            then(resData => {
                if (resData.success) {
                    navigation.navigate('ConfirmEdit', { id });
                } else {
                    seterror(resData.message)
                }
            })
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
                        borderWidth: 0.3,
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
                        borderWidth: 0.3,
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
                    <TouchableOpacity style={{
                        backgroundColor: "yellow", borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={Clear}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: "#34eb9e", borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={() => Confirm({ id, title, description, status })} ><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default PostEditScreen;