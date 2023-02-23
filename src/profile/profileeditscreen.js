import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const data = [
  { label: 'Admin', value: 1 },
  { label: 'User', value: 0 },
];
const ProfileEditScreen = ({ route, navigation }) => {
  const items = route.params.data.data;
  console.log(route.params);
  const date_object = new Date(items.date_of_birth)
  console.log(date_object);
  const [id, setId] = useState(items.id)
  const [name, setName] = useState(items.name);
  const [email, setemail] = useState(items.email);
  const [address, setaddress] = useState(items.address);
  const [phone, setphone] = useState(items.phone);
  const [selectedDate, setSelectedDate] = useState(date_object);
  const [dateone, setDate] = useState(items.date_of_birth);
  const [selectedImage, setSelectedImage] = useState(items.profile);
  const [value, setValue] = useState(parseInt(items.type));
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [error, seterror] = useState({});
  const Clear = () => {
    setName(' ');
    setemail(' ');
    setaddress(' ');
    setphone(' ');
    seterror('');
    // setSelectedDate({})
  }
  const Confrim = async (name) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://172.20.80.99:8000/api/profile/edit', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      }).then(res => res.json()).
        then(resData => {
          if (resData.success) {
            navigation.navigate('Gg', { name: name });
          } else {
            seterror(resData.message);
          }
        })
    }
    catch (error) {
      console.error(error);
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
    setDate(`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`);
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
          source={selectedImage && selectedImage.assets ? ({ uri: selectedImage.assets[0].uri }) : ({ uri: 'http://172.20.80.99:8000/storage/' + selectedImage })}
        // source={{ uri: 'http://172.20.80.99:8000/storage/' + selectedImage }}
        />

        <Button title='Select an Image' onPress={launch} />
        <TextInput style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10, marginTop: 10 }} placeholder="Enter your name" value={name} onChangeText={text => setName(text)} />
        {error.name && (
          <Text style={{ color: 'red' }}>{error.name}</Text>
        )}
        <TextInput style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Email" value={email} onChangeText={text => setemail(text)} />
        {error.email && (
          <Text style={{ color: 'red' }}>{error.email}</Text>
        )}
        <TextInput style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Phone Number" keyboardType='numeric' value={phone} onChangeText={text => setphone(text)} />
        {error.phone && (
          <Text style={{ color: 'red' }}>{error.phone}</Text>
        )}
        <TextInput style={{ borderRadius: 30, width: '100%', borderWidth: 1, marginBottom: 10 }} placeholder="Enter your Address" numberOfLines={7} multiline={true} value={address} onChangeText={text => setaddress(text)} />

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
          initialValue={route.params.data.data.type}
          style={{
            borderColor: 'blue', borderRadius: 30, height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingHorizontal: 8,
            width: '100%',
          }}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>

          <TouchableOpacity onPress={() => navigation.navigate('passwordReset')}><Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Password Reset</Text></TouchableOpacity>

          <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'yellow', marginTop: 10, marginHorizontal: 20 }}
            onPress={Clear}
          >
            <Text style={{ fontSize: 14 }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 10, paddingVertical: 15, backgroundColor: 'springgreen', marginTop: 10 }}
            onPress={() => Confrim({ id, name, email, address, phone, dateone, selectedImage, value })}
          ><Text style={{ fontSize: 14 }}>Confrim</Text></TouchableOpacity>

        </View>

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
export default ProfileEditScreen;