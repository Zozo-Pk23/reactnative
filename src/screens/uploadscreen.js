import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import postapi from '../api/postapi';

const UploadScreen = ({ navigation }) => {
    const [file, setFile] = useState(null);
    const [errorMessage, seterrorMessage] = useState({});
    const [error, seterror] = useState({});
    const upload = async (file) => {
        postapi.upload(file)
            .then(resData => {
                console.log(resData);
                if (resData.success) {
                    navigation.navigate('Home', { setloading: true });
                } else {
                    // console.log(JSON.stringify(resData.message));
                    seterror(resData.message)
                    //console.log(JSON.stringify(resData[1]))
                    seterrorMessage(resData[1]);
                }
            })

    }
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFile(result);
            console.log(result[0].uri);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                throw err;
            }
        }
    };

    const renderItem = ({ item }) => (
        console.log(item)
    );



    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {
                file ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.text}>
                            File Name: {file[0].name}
                        </Text>
                        <TouchableOpacity style={{ alignItems: 'center', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20, width: 150 }}
                            onPress={pickDocument}
                        >
                            <Text style={{ fontSize: 14, color: 'white' }}>Pick File</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20, width: 150 }}
                            onPress={() => upload(file)}
                        >
                            <Text style={{ fontSize: 14, color: 'white' }}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.text}>No file selected</Text>

                        <TouchableOpacity style={{ alignItems: 'center', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20, width: 200 }}
                            onPress={pickDocument}
                        >
                            <Text style={{ fontSize: 14, color: 'white' }}>Pick File</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {error ? (
                <Text style={{ color: 'red', fontSize: 16 }}>{error.type}</Text>
            ) : (null)}
            {
                errorMessage ? (
                    <View>
                        <FlatList
                            data={errorMessage}
                            renderItem={({ item }) =>
                                <View><Text style={{ color: 'red', fontSize: 16 }}>{item.errors[0]} at line No -{item.row}</Text></View>
                            }
                        />
                    </View >
                ) : (
                    <View><Text> </Text></View>
                )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default UploadScreen;
