import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import api from '../api/api';

const data = [
    { label: 'Admin', value: 1 },
    { label: 'User', value: 0 },
];
const UserAddScreen = ({ navigation }) => {
    const [name, setName] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [address, setaddress] = useState();
    const [phone, setphone] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [value, setValue] = useState(0);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [uri, seturi] = useState();
    const [error, seterror] = useState({});

    const clear = () => {
        setName('');
        setemail('');
        setpassword('');
        setconfirmpassword('');
        setphone('');
        setaddress('');
        seterror('');
    }
    const confirm = () => {
        api.Confrim(name, email, password, confirmpassword, phone, address, selectedDate, selectedImage, value, uri)
            .then(({ result, base64 }) => {
                console.log(result)
                if (result.errors) {
                    seterror(result.errors);
                    console.log(result);
                } else {
                    console.log('Validation Success');
                    navigation.navigate('userConfirm', { name: name, email: email, password: password, address: address, phone: phone, selectedDate: selectedDate, selectedImage: selectedImage, value: value, image: base64 });
                }
            })
    }
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const launch = async () => {
        const result = await launchImageLibrary();
        setSelectedImage(result);
    }

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('UserList', {
                params: {
                    searchname: null,
                    searhemail: null,
                    craetefrom: '',
                    createto: '',
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
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Avatar
                    rounded
                    size={130}
                    source={selectedImage && selectedImage.assets ? ({ uri: selectedImage.assets[0].uri }) : ({ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT2VEmIR68pPnPgko_LL5shFwfUOuAhX0JAx_CIVhohEWoArcpr9H2VXPgZRiy3_1UIGhiwd8xnqMgdtNA' })}
                />
                <View style={{ marginTop: 20 }}>
                    <Button title='Select an Image' onPress={launch} />
                </View>
                {error.selectedImage && (
                    <Text style={{ color: 'red' }}>{error.selectedImage}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 40, width: '100%', borderWidth: 0.3, marginBottom: 10, marginTop: 10 }} placeholder="Enter your name" value={name} onChangeText={text => setName(text)} />
                {error.name && (
                    <Text style={{ color: 'red' }}>{error.name}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 40, width: '100%', borderWidth: 0.3, marginBottom: 10 }} placeholder="Enter your Email" value={email} onChangeText={text => setemail(text)} />
                {error.email && (
                    <Text style={{ color: 'red' }}>{error.email}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 40, width: '100%', borderWidth: 0.3, marginBottom: 10 }} placeholder="Enter your Password" value={password} onChangeText={text => setpassword(text)} />
                {error.password && (
                    <Text style={{ color: 'red' }}>{error.password}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 40, width: '100%', borderWidth: 0.3, marginBottom: 10 }} placeholder="Enter your Confirm Password" value={confirmpassword} onChangeText={text => setconfirmpassword(text)} />
                {error.confirmpassword && (
                    <Text style={{ color: 'red' }}>{error.confirmpassword}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 40, width: '100%', borderWidth: 0.3, marginBottom: 10 }} placeholder="Enter your Phone Number" value={phone} onChangeText={text => setphone(text)} keyboardType='numeric' selectTextOnFocus={true} />
                {error.phone && (
                    <Text style={{ color: 'red' }}>{error.phone}</Text>
                )}
                <TextInput style={{ borderRadius: 22, backgroundColor: '#f0f0f0', paddingLeft: 40, marginVertical: 5, height: 100, width: '100%', borderWidth: 0.3, marginBottom: 10 }} placeholder="Enter your Address" numberOfLines={7} multiline={true} value={address} onChangeText={text => setaddress(text)} />

                <Button title="Select a date" onPress={showDatePicker} />

                {error.date_of_birth && (
                    <Text style={{ color: 'red' }}>{error.date_of_birth}</Text>
                )}
                <View style={{ flexDirection: 'row' }}>
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={datePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                    </Text>
                </View>
                <Dropdown
                    style={{
                        marginTop: 10,
                        borderColor: 'blue', borderRadius: 30, height: 40,
                        borderColor: '#000000',
                        backgroundColor: '#f0f0f0',
                        borderWidth: 0.3,
                        paddingHorizontal: 8,
                        width: '100%',
                        paddingLeft: 40
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    placeholderTextColor="#909090"
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        marginTop: 20,
                        backgroundColor: "yellow", borderRadius: 20, marginRight: 50,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={() => clear()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 20,
                        backgroundColor: "#34eb9e", borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={() => confirm()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    dropdown: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 0.3,
        paddingHorizontal: 8,
        width: '100%',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
export default UserAddScreen;