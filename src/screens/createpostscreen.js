import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [error, seterror] = useState({});
    const Clear = () => {
        setTitle(' ');
        setDescription(' ');
        seterror('');
    }
    const Confirm = async (title, description) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetch(`http://172.20.80.99:8000/api/blogs/createsomething`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            }).then(res => res.json()).
                then(resData => {
                    if (resData.success) {
                        navigation.navigate('Confirm', { data: title })
                    } else {
                        seterror(resData.message)
                    }
                })

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Create Form</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 50
            }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>Title</Text>
                <TextInput onChangeText={text => setTitle(text)}
                    value={title}
                    style={{
                        backgroundColor: '#fff',
                        marginVertical: 10,
                        borderRadius: 5,
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
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>Description</Text>
                <TextInput onChangeText={text => setDescription(text)} numberOfLines={4} multiline={true} value={description}
                    style={{
                        backgroundColor: '#fff',
                        marginVertical: 10,
                        borderRadius: 5,
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
                        onPress={() => Confirm({ title, description })}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default CreatePostScreen;