import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const Clear = () => {
        setTitle(' ');
        setDescription(' ');
    }
    const Confirm = (title, description) => {
        console.log(title, description);
        navigation.navigate('Confirm',{title:title,description:description});
    }
    return (
        <View style={{ backgroundColor: 'cyan', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Create Form</Text>
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
                    <Button title="Confrim" onPress={() => Confirm({ title, description })} />
                </View>
            </View>
        </View>
    )
}
export default CreatePostScreen;