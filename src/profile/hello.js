import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from "react-native-gesture-handler";
import { Avatar, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dialog } from "@rneui/base/dist/Dialog";
import moment from "moment";
const UserList = ({ route, navigation }) => {
    const [loading, setloading] = useState(false);
    const [users, setusers] = useState();
    const [data, setData] = useState([]);
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
        const token = await AsyncStorage.getItem('token');
        try {
            await axios.get(`http://172.20.80.99:8000/api/profile/`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    setusers(data);
                })
        } catch (error) {
            console.error(error);
        }
    }
    const getProfile = async () => {
        setloading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://172.20.80.99:8000/api/getUser`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            setData(response.data.user);
            setloading(false);
            console.log(response.data.user.type);
        } catch (error) {
            if (error.response === 429) {
                console.log('Too many requests, try again later.');
            } else {
                console.error(error);
            }
        }
    };
    const getSearchUser = async (searchname, searchemail, createdfrom, createdto) => {
        const token = await AsyncStorage.getItem('token');

        const date = new Date(createdfrom);
        const dateone = new Date(createdto);
        let formattedDate = null;
        let formattedDateOne = null;
        if (dateone && !isNaN(dateone.getTime())) {
            formattedDate = `${dateone.getFullYear()}-${("0" + (dateone.getMonth() + 1)).slice(-2)}-${("0" + dateone.getDate()).slice(-2)}`;
        }

        if (date && !isNaN(date.getTime())) {
            formattedDateOne = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        }
        let params = {
            searchname: searchname,
            searchemail: searchemail,
        }
        if (formattedDate) {
            params.createdfrom = formattedDateOne;
        }

        if (formattedDateOne) {
            params.createdto = formattedDate;
        }
        try {
            console.log(searchemail, searchname, formattedDate, formattedDate);
            await axios.get(`http://172.20.80.99:8000/api/profile`,
                {
                    params: params,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
                .then(({ data }) => {
                    console.log(data);
                    setusers(data);
                })
                .then(() => {
                    setsearchname(null);
                    setsearchemail(null);
                    setcreatedfrom();
                    setcreatedto();
                }
                )
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
        const token = await AsyncStorage.getItem('token');
        await fetch(`http://172.20.80.99:8000/api/profile/delete`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
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
        getProfile();
        if (route.params?.setloading) {
            setloading(true);
        }
    }, [route.params]);

    function List({ data }) {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>Profile <Avatar rounded size={100}
                        source={data ? ({ uri: 'http://172.20.80.99:8000/storage/' + data.profile }) : ({ uri: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT2VEmIR68pPnPgko_LL5shFwfUOuAhX0JAx_CIVhohEWoArcpr9H2VXPgZRiy3_1UIGhiwd8xnqMgdtNA' })}
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
        <View style={{ paddingBottom: 200, backgroundColor: '#c96d76' }}>
            <Dialog isVisible={loading} overlayStyle={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                <Dialog.Loading />
            </Dialog>
            <Modal animationType="slide" transparent={true} visible={detailmodal} onRequestClose={() => {

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
            <View style={{ paddingHorizontal: 30 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
                    <TextInput style={styles.textinput} placeholder="Search " onChangeText={text => setsearchname(text)} value={searchname} />
                    <TextInput style={styles.textinput} placeholder="Search email" onChangeText={text => setsearchemail(text)} value={searchemail} />
                    <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#34eb9e', padding: 10, borderRadius: 20, width: 70 }} onPress={() => navigation.navigate('Useradd')}>

                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }} >

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
                    <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 20, width: 70 }} onPress={() => getSearchUser(searchname, searchemail, createdfrom, createdto)}><Text style={styles.textStyle}>Search</Text></TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginVertical: 20, justifyContent: 'space-evenly' }} >
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>
                        Created From :{createdfrom ? createdfrom.toLocaleDateString() : ' '}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#ffffff' }}>
                        Created To   :{createdto ? createdto.toLocaleDateString() : ' '}
                    </Text>
                </View>
            </View>
            {
                users ? (
                    <FlatList
                        data={users}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => details(item)}>
                                <View style={{ backgroundColor: '#f0ffff', padding: 20, marginHorizontal: 30, marginVertical: 10, borderRadius: 40 }}>
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
                                        <Text>Created at</Text><Text>{moment(item.createdat).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <Text>Updated at</Text><Text>{moment(item.updatedat).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <View></View>

                                        <View>
                                            {item.id != data.id &&
                                                <TouchableOpacity onPress={() => destroy(item.id)} style={{ backgroundColor: '#ff3333', padding: 10, borderWidth: 1, borderRadius: 15 }}>
                                                    <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>Delete</Text>
                                                </TouchableOpacity>
                                            }
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
                )
            }

        </View >
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
        paddingLeft: 10,
        width: '30%',
        backgroundColor: '#f0f0f0',
        height: 40,
        borderRadius: 10,
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
