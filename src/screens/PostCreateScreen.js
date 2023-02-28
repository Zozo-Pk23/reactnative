import { View, Text, TextInput, Button, BackHandler, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../ApiService';
import postapi from '../api/postapi';
const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState();
    const [error, seterror] = useState({});
    const [description, setDescription] = useState();
    const ConfirmPost = async (title) => {
        postapi.ConfirmPost(title)
            .then((result) => {
                if (result.success) {
                    navigation.navigate('Confirm', { data: title })
                } else {
                    seterror(result.message)
                }
            })
    }
    const Clear = () => {
        setTitle(' ');
        setDescription(' ');
        seterror('');
    }
    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home', {
                params: {
                    search: null,
                }
            })
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Create Form</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 50
            }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>Title</Text>
                <TextInput onChangeText={text => setTitle(text)}
                    value={title}
                    style={{
                        paddingLeft: 20,
                        marginVertical: 10,
                        borderRadius: 22,
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
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>Description</Text>
                <TextInput onChangeText={text => setDescription(text)} numberOfLines={4} multiline={true} value={description}
                    style={{
                        paddingLeft: 20,
                        marginVertical: 10,
                        borderRadius: 22,
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
                    }} onPress={() => ConfirmPost({ title, description })} ><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default CreatePostScreen;

