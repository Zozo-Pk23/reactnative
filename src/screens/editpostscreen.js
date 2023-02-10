import { View, Text, Button } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
const PostEditScreen = ({ route, navigation }) => {
    const [title, setTitle] = useState(route.params.title);
    const [description, setDescription] = useState(route.params.description);
    const [status, setStatus] = useState(route.params.status);
    const [id, setId] = useState(route.params.id)
    const Clear = () => {
        setTitle(' ');
        setDescription(' ');
    }
    const Confirm = (id) => {
        navigation.navigate('ConfirmEdit', {id});
    }


    console.log(route.params.id);
    return (
        <View style={{ backgroundColor: 'cyan', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Edit Form</Text>
            <View style={{
                flexDirection: 'row', marginVertical: 100
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Title</Text>
                <TextInput onChangeText={text => setTitle(text)}
                    value={title}
                    style={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        width: '50%',
                        borderWidth: 1,
                        fontSize: 16
                    }} />
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Description</Text>
                <TextInput onChangeText={text => setDescription(text)} numberOfLines={4} multiline={true} value={description}
                    style={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                        borderRadius: 5,
                        width: '50%',
                        borderWidth: 1,
                        fontSize: 16
                    }} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 160, }}>
                <View>
                    <Button title="Clear" onPress={Clear} />
                </View>
                <View style={{ marginLeft: 200 }}>
                    <Button title="Confrim" onPress={() => Confirm({ id, title, description, status })} />
                </View>
            </View>
        </View>
    )
}
export default PostEditScreen;