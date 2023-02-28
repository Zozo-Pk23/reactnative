import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import api from '../api/api';

const data = [
  { label: 'Admin', value: 1 },
  { label: 'User', value: 0 },
];
const ProfileEditScreen = ({ route, navigation }) => {
  const items = route.params.data.data;
  // console.log(route.params);
  const date_object = new Date(items.date_of_birth)
  // console.log(date_object);
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
  const [profile, setprofile] = useState({});
  const Clear = () => {
    setName(' ');
    setemail(' ');
    setaddress(' ');
    setphone(' ');
    seterror('');
  }
  const Confrim = async (name) => {
    api.ConfirmEdit(name)
      .then(res => res.json()).
      then(resData => {
        if (resData.success) {
          navigation.navigate('Gg', { name: name });
        } else {
          seterror(resData.message);
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
    setDate(`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`);
  };

  const launch = async () => {
    const result = await launchImageLibrary({}, response => {
      if (response.didCancel) {
        setSelectedImage(selectedImage)
      } else {
        setSelectedImage(response);
      }
    });
  }
  const isDropdownDisabled = profile.type == 0;
  useEffect(() => {
    api.getProfile().then((data) => {
      setprofile(data);
    });
  }, [])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Avatar
          rounded
          size={130}
          source={selectedImage && selectedImage.assets ? ({ uri: selectedImage.assets[0].uri }) : ({ uri: 'http://172.20.80.99:8000/storage/' + selectedImage })}
        // source={{ uri: 'http://172.20.80.99:8000/storage/' + selectedImage }}
        />

        <View style={{ marginTop: 20 }}><Button title='Select an Image' onPress={launch} /></View>
        <TextInput style={{ borderRadius: 22, width: '100%', borderWidth: 0.3, marginVertical: 5, paddingLeft: 40, marginTop: 10 }} placeholder="Enter your name" value={name} onChangeText={text => setName(text)} />
        {error.name && (
          <Text style={{ color: 'red' }}>{error.name}</Text>
        )}
        <TextInput style={{ borderRadius: 22, width: '100%', borderWidth: 0.3, marginVertical: 5, paddingLeft: 40 }} placeholder="Enter your Email" value={email} onChangeText={text => setemail(text)} />
        {error.email && (
          <Text style={{ color: 'red' }}>{error.email}</Text>
        )}
        <TextInput style={{ borderRadius: 22, width: '100%', borderWidth: 0.3, marginVertical: 5, paddingLeft: 40 }} placeholder="Enter your Phone Number" keyboardType='numeric' value={phone} onChangeText={text => setphone(text)} />
        {error.phone && (
          <Text style={{ color: 'red' }}>{error.phone}</Text>
        )}
        <TextInput style={{ borderRadius: 22, width: '100%', borderWidth: 0.3, marginVertical: 5, paddingLeft: 40 }} placeholder="Enter your Address" numberOfLines={7} multiline={true} value={address} onChangeText={text => setaddress(text)} />

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
          disable={isDropdownDisabled}
          initialValue={route.params.data.data.type}
          style={{
            borderColor: 'blue', paddingLeft: 40, borderRadius: 22, height: 40,
            borderColor: '#000000',
            borderWidth: 0.3,
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('passwordReset')}><Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Password Reset</Text></TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{
              backgroundColor: "yellow", borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginHorizontal: 30,
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
            }} onPress={() => Confrim({ id, name, email, address, phone, dateone, selectedImage, value })}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  dropdown: {
    height: 40,
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
export default ProfileEditScreen;