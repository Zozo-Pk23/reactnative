import React, { Component, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState(null);
  const download = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/blogs/download`, {
        responseType: 'blob'
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  const getPosts = async () => {
    try {
      let response = await axios.get(`http://10.0.2.2:8000/api/blogs`)
      let data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getSearchPost = async (search) => {
    try {
      let response = await axios.get(`http://10.0.2.2:8000/api/blogs?searchitem=${search}`)
      let data = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const destroy = async (id) => {
    alert(id);
    await fetch('http://10.0.2.2:8000/api/blogs/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(
      getPosts
    )
  }
  const edit = async (id, title, description, status) => {
    navigation.navigate('Edit', { id: id, title: title, description: description, status: status })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={{ paddingBottom: 100 }} >
      {data ? (
        <View>
          <Button title='download' onPress={() => download()} />
          <Button title='refresh' onPress={() => getPosts()} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={{
                width: '60%',
                backgroundColor: '#f0f0f0',
                height: 50,
                elevation: 2,
                borderRadius: 22,
                paddingLeft: 40,
              }}
              placeholder="Enter title or description"
              placeholderTextColor="#909090"
              onChangeText={text => setsearch(text)}
              value={search}
            />
            <TouchableHighlight style={[styles.button, styles.buttonClose]} onPress={() => getSearchPost(search)}><Text style={styles.textStyle}>Search</Text></TouchableHighlight>
          </View>
          <Button title='CreatePost' onPress={() => navigation.navigate('Create')} />
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <View style={{ backgroundColor: '#000000', padding: 10, margin: 10 }}>
                <Text style={{ color: '#fff' }}>Title : {item.title}</Text>
                <Text style={{ color: '#fff' }}>Description : {item.description}</Text>
                <Text style={{ color: '#fff' }}>Created User : {item.pname}</Text>
                <Text style={{ color: '#fff' }}>Created at :{item.created_at} </Text>
                <Button title='edit' onPress={() => edit(item.id, item.title, item.description, item.status)} />
                <Button title='delete' onPress={() => destroy(item.id)} />
              </View>
            }
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
  textinput: {
    height: 40,
    width: '30%',
    borderWidth: 1,
    borderRadius: 20
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
