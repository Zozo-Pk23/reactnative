import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';

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
    const [errors, setErrors] = useState({});
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [uri, seturi] = useState();

    const Confrim = async (name, email, password, confirmpassword, address, phone, selectedDate, selectedImage, value, uri) => {
        try {
            const base64 = await RNFetchBlob.fs.readFile(selectedImage.assets[0].uri, 'base64');
            const response = await fetch('http://10.0.2.2:8000/api/profile/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, password: password, confirmpassword: confirmpassword, address: address, phone: phone, date_of_birth: selectedDate, image: base64, type: value, uri: uri })
            })
            const result = await response.json();
            if (result.success) {
                console.log('Validation Success');
                navigation.navigate('userConfirm', { name: name, email: email, password: password, address: address, phone: phone, selectedDate: selectedDate, selectedImage: selectedImage, value: value, image: base64 });
            } else {
                console.log(result.errors);
            }
        }
        catch (error) {
            return error.response.data.errors;
        }
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

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Avatar
                    rounded
                    size={130}
                    source={selectedImage && selectedImage.assets ? ({ uri: selectedImage.assets[0].uri }) : ({ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT2VEmIR68pPnPgko_LL5shFwfUOuAhX0JAx_CIVhohEWoArcpr9H2VXPgZRiy3_1UIGhiwd8xnqMgdtNA' })}
                />
                <Button title='Select an Image' onPress={launch} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} placeholder="Enter your name" value={name} onChangeText={text => setName(text)} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Email" value={email} onChangeText={text => setemail(text)} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Password}" value={password} onChangeText={text => setpassword(text)} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Confirm Password" value={confirmpassword} onChangeText={text => setconfirmpassword(text)} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Phone Number" value={phone} onChangeText={text => setphone(text)} />
                <TextInput style={{ width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Address" numberOfLines={7} multiline={true} value={address} onChangeText={text => setaddress(text)} />

                <Button title="Select a date" onPress={showDatePicker} />
                <View style={{ flexDirection: 'row' }}>
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={datePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={{ fontSize: 16 }}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                    </Text>
                </View>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
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
                <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: 'springgreen', marginTop: 10 }}
                    onPress={() => Confrim(name, email, password, confirmpassword, phone, address, selectedDate, selectedImage, value, uri)}
                ><Text style={{ fontSize: 14 }}>Confrim</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    dropdown: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
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