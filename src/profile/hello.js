import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
const UserList = ({ navigation }) => {
    const [users, setusers] = useState();
    const [selectedId, setselectedId] = useState(null);
    const [searchname, setsearchname] = useState(null);
    const [searchemail, setsearchemail] = useState(null);
    const [createdfrom, setcreatedfrom] = useState();
    const [createdto, setcreatedto] = useState();
    const [datePickerVisibleOne, setDatePickerVisibleOne] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [detailmodal, setdetailmodal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selecteddata, setselecteddata] = useState(null);
    const getAllUsers = async () => {
        try {
            await axios.get(`http://10.0.2.2:8000/api/profile/`)
                .then(({ data }) => {
                    setusers(data);
                })
        } catch (error) {
            console.error(error);
        }
    }

    const getSearchUser = async (searchname, searchemail) => {
        try {
            console.log(searchemail, searchname);
            await axios.get(`http://10.0.2.2:8000/api/profile?searchname=${searchname}&searchemail=${searchemail}&createdfrom=${createdfrom}&createdto=${createdto}`)

                .then(({ data }) => {
                    console.log(data);
                    setusers(data);
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const details = async (item) => {
        console.log(item);
        setdetailmodal(true);
        setselecteddata(item);
    }

    const destroy = async (id) => {
        setModalVisible(true);
        setselectedId(id);
    }


    const cut = async (id) => {
        await fetch(`http://10.0.2.2:8000/api/profile/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(
            getAllUsers()
        ).then(
            setModalVisible(false)
        )
    }

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setcreatedfrom(date);
        hideDatePicker();
    };

    //////////////////

    const showDatePickerOne = () => {
        setDatePickerVisibleOne(true);
    };

    const hideDatePickerOne = () => {
        setDatePickerVisibleOne(false);
    };

    const handleConfirmOne = (date) => {
        setcreatedto(date);
        hideDatePickerOne();
    };


    useEffect(() => {
        getAllUsers();
    }, []);

    function List({ data }) {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Profile   <Avatar rounded size={100}
                        source={{
                            uri: data.profile,
                        }}
                    /></Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Name   {data.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Email  {data.email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Address   {data.address}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Birthday  {data.date_of_birth}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Phone  {data.phone}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={{ paddingBottom: 150 }}>
            <Modal animationType="slide" transparent={true} visible={detailmodal} onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setdetailmodal(!detailmodal);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <List data={selecteddata} />

                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setdetailmodal(!detailmodal), setselecteddata(null) }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete!!!</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.margin]}
                                onPress={() => cut(selectedId)}>
                                <Text style={styles.textStyle}>delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 20 }}>
                <TextInput style={styles.textinput} placeholder="Search username" onChangeText={text => setsearchname(text)} value={searchname} />
                <TouchableHighlight style={[styles.button, styles.buttonClose]} onPress={() => getSearchUser(searchname, searchemail,)}><Text style={styles.textStyle}>Search</Text></TouchableHighlight>
                <TouchableHighlight style={[styles.button, styles.buttonClose]} onPress={() => getAllUsers()}><Text style={styles.textStyle}>Refresh</Text></TouchableHighlight>
                <TouchableHighlight style={[styles.button, styles.buttonClose]} onPress={() => navigation.navigate('Useradd')}><Text style={styles.textStyle}>Add User</Text></TouchableHighlight>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 20 }} >
                <TextInput style={styles.textinput} placeholder="Search email" onChangeText={text => setsearchemail(text)} value={searchemail} />
                <Button title="Created From" onPress={showDatePicker} />
                <DateTimePickerModal
                    date={createdfrom}
                    isVisible={datePickerVisible}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Button title="Created To" onPress={showDatePickerOne} />
                <DateTimePickerModal
                    date={createdto}
                    isVisible={datePickerVisibleOne}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={handleConfirmOne}
                    onCancel={hideDatePickerOne}
                />
            </View>
            <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'space-evenly' }} >
                <Text style={{ fontSize: 16 }}>
                    Created From :{createdfrom ? createdfrom.toLocaleDateString() : ' '}
                </Text>
                <Text style={{ fontSize: 16 }}>
                    Created To   :{createdto ? createdto.toLocaleDateString() : ' '}
                </Text>
            </View>
            {users ? (
                <FlatList
                    data={users}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => details(item)}>
                            <View style={{ padding: 20 }}>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Name</Text><Text>{item.name}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Email</Text><Text>{item.email}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Created User</Text><Text>{item.pname}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Phone Number</Text><Text>{item.phone}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Birthday</Text><Text>{item.date_of_birth}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Address</Text><Text>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Created at</Text><Text>{item.created_at}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <Text>Updated at</Text><Text>{item.updated_at}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View></View>
                                    <View>
                                        <TouchableOpacity onPress={() => destroy(item.id)} style={{ backgroundColor: '#ff3333', padding: 10, borderWidth: 1, borderRadius: 15 }}>
                                            <Text style={{ color: "#ff9999" }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            ) : (
                <View style={{ marginTop: 200 }}>
                    <Text>No Date Found</Text>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textinput: {
        height: 40,
        width: '30%',
        borderWidth: 1,
        borderRadius: 20
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    margin: {
        marginLeft: 15,
        backgroundColor: 'red'
    }
});

export default UserList;
