import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button, Modal, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from "react-native-gesture-handler";
import { Avatar, Icon } from "react-native-elements";
import { Dialog } from "@rneui/base/dist/Dialog";
import moment from "moment";
import api from "../api/api";
const UserList = ({ route, navigation }) => {
    const [loading, setloading] = useState(false);
    const [users, setusers] = useState();
    const [data, setData] = useState({});
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
    const search = () => {
        api.getSearchUser(searchname, searchemail, createdfrom, createdto)
            .then((data) => {
                console.log(data);
                setusers(data);
            })
    }

    const lost = async (id) => {
        api.cut(id)
            .then(
                api.getAllUsers().then((data) => {
                    setusers(data);
                })
            ).then(setModalVisible(false))
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
        setloading(true);
        if (route.params) {
            setloading(true);
            setsearchemail(route.params.email);
            setsearchname(route.params.name);
            setcreatedfrom(route.params.createdfrom);
            setcreatedto(route.params.createdto);
            setloading(false)
        }
        api.getAllUsers().then((data) => {
            setusers(data);
            setloading(false);
        })
        api.getProfile().then((data) => {
            setData(data);
            setloading(false);
        });
        if (route.params?.setloading) {
            setloading(true);
            api.getAllUsers().then((data) => {
                setusers(data);
                setloading(false);
            })
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
        <View style={{ paddingBottom: 200 }}>
            {/* <Dialog isVisible={loading} overlayStyle={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
                <Dialog.Loading />
            </Dialog> */}
            {loading ? (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : null}
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
                        <Text style={styles.modalText}>Are you sure you want to delete?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.margin]}
                                onPress={() => lost(selectedId)}>
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

                        <Text style={{ fontWeight: 'bold', color: '#000000' }}>Add</Text>
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
                    <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 20, width: 70 }} onPress={search}><Text style={styles.textStyle}>Search</Text></TouchableOpacity>
                </View>
                <View style={{ marginVertical: 20, justifyContent: 'space-evenly' }} >
                    <Text style={{ fontSize: 16, color: '#000000' }}>
                        Created From :{createdfrom ? createdfrom.toLocaleDateString() : ' '}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#000000' }}>
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
                                        <Text>Created at</Text><Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                        <Text>Updated at</Text><Text>{moment(item.updated_at).format('DD-MM-YYYY')}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
                                        <View></View>
                                        <View>
                                            {item.id != data.id &&
                                                <Pressable
                                                    style={[styles.button, styles.buttonClose, styles.margin]}
                                                    onPress={() => destroy(item.id)}>
                                                    <Text style={styles.textStyle}>delete</Text>
                                                </Pressable>
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
        borderWidth: 0.2,
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
    }, activityIndicator: {
        position: 'absolute',
        top: '50%',
        right: '50%'
    },
});

export default UserList;
