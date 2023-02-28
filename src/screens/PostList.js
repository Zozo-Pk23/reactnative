import React, { Component, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { Dialog } from "@rneui/base";
import moment from 'moment';
import postapi from '../api/postapi';
const HomeScreen = ({ route, navigation }) => {
  console.log(route.params);
  const [data, setData] = useState([]);
  const [detailmodal, setdetailmodal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setselectedId] = useState(null);
  const [search, setsearch] = useState();
  const [loading, setloading] = useState(false);
  const download = async () => {
    postapi.download();
  };
  const getSearchPost = async (search) => {
    postapi.getSearchPost(search).then((data) => {
      setData(data);
    })
  }
  const destroy = async (id) => {
    setModalVisible(true);
    setselectedId(id);
  }
  const cut = async (id) => {
    postapi.lost(id)
      .then(
        postapi.getPosts().then((data) => {
          setData(data);
        })
      ).then(
        setModalVisible(false)
      )
  }
  const edit = async (id, title, description, status) => {
    navigation.navigate('Edit', { id: id, title: title, description: description, status: status })
  }

  useEffect(() => {
    setloading(true);
    setsearch(null);
    postapi.getPosts().then((data) => {
      setData(data);
      setloading(false);
    })
    if (route.params) {
      setsearch(route.params.search);
    }
    if (route.params?.setloading) {
      setloading(true);
      postapi.getPosts().then((data) => {
        setData(data);
        setloading(false);
      })
    }
  }, [route.params], []);

  const Item = ({ item }) => {
    return (
      <View style={{ backgroundColor: '#f0ffff', padding: 30, marginHorizontal: 30, marginVertical: 20, borderRadius: 40, width: 350 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Title :</Text><Text> {item.title}</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Description :</Text><View style={{ width: 160, alignItems: 'flex-end' }}><Text style={{ textAlign: 'right' }}> {item.description}</Text></View></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Created User :</Text><Text> {item.pname}</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text>Created at :</Text><Text>{moment(item.date).format('DD-MM-YYYY')} </Text></View>
        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginVertical: 10 }}>
          <TouchableOpacity style={[styles.button, styles.colorone,]} onPress={() => edit(item.id, item.title, item.description, item.status)}>
            <Text style={{
              color: '#000000', fontWeight: 'bold',
              textAlign: 'center',
            }}>Edit</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.color]} onPress={() => destroy(item.id)}><Text style={styles.textStyle}>Delete</Text></TouchableOpacity>
        </View>
      </View >
    )
  }
  return (
    <View style={{ paddingBottom: 300, flex: 1 }}>
      {/* <Dialog isVisible={loading} overlayStyle={{ backgroundColor: "rgba(255, 255, 255, 0),", shadowOpacity: 0 }}>
        <Dialog.Loading />
      </Dialog> */}
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      {data ? (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 20 }}>
            <TextInput
              style={{
                width: '70%',
                backgroundColor: '#f0f0f0',
                height: 40,
                borderRadius: 22,
                paddingLeft: 40,
                borderWidth: 0.3
              }}
              placeholder="Enter title or description"
              placeholderTextColor="#909090"
              onChangeText={text => setsearch(text)}
              value={search}
            />
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => getSearchPost(search)}><Text style={styles.textStyle}>Search</Text></TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-around', marginVertical: 10 }}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={download}><Text style={styles.textStyle}>Download</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => navigation.navigate('Upload')}><Text style={styles.textStyle}>Upload</Text></TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: "#34eb9e", borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 20,
              elevation: 2,
            }} onPress={() => navigation.navigate('Create')}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Add</Text></TouchableOpacity>
          </View>
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
                    onPress={() => cut(selectedId)}>
                    <Text style={styles.textStyle}>delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} />}
          />
        </View>
      ) : (
        <Text>No data to show</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  colorone: {
    backgroundColor: 'yellow',
  },
  color: {
    backgroundColor: 'red'
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
  textinput: {
    height: 40,
    width: '30%',
    borderWidth: 0.5,
    borderRadius: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    right: '50%'
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  margin: {
    marginLeft: 50,
    backgroundColor: 'red'
  }
});

export default HomeScreen;
// const download = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     let response = await axios.get(`http://172.20.80.99:8000/api/blogs`
  //       , {
  //         headers: { 'Authorization': 'Bearer ' + token }
  //       })
  //     let data = response.data;
  //     console.log(data);

  //     let csv = '';
  //     const header = Object.keys(data[0]).join(',');
  //     csv += header + '\n';

  //     data.forEach(row => {
  //       const values = Object.values(row).join(',');
  //       csv += values + '\n';
  //     });
  //     const dir = RNFS.ExternalDirectoryPath;
  //     const path = `${dir}/api_data.csv`;
  //     console.log(path);
  //     RNFS.writeFile(path, csv, 'utf8')
  //       .then(() => alert('CSV file saved successfully'))
  //       .catch(error => console.error(error));
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getPosts = async () => {
  //   setloading(true);
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     let response = await axios.get(`http://172.20.80.99:8000/api/blogs`
  //       , {
  //         headers: { 'Authorization': 'Bearer ' + token }
  //       })
  //     let data = response.data;
  //     setData(data);
  //     setloading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getSearchPost = async (search) => {
  //   let params = {
  //     searchitem: search,
  //   }
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     let response = await axios.get(`http://172.20.80.99:8000/api/blogs`, {
  //       params: params,
  //       headers: { 'Authorization': 'Bearer ' + token }
  //     })
  //     let data = response.data;
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const cut = async (id) => {
  //   const token = await AsyncStorage.getItem('token');
  //   await fetch(`http://172.20.80.99:8000/api/blogs/delete`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token
  //     },
  //     body: JSON.stringify({ id })
  //   }).then(
  //     getPosts()
  //   ).then(
  //     setModalVisible(false)
  //   )
  // }