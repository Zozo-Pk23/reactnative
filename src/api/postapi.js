import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import { BASE_URL } from "../../Api";
var RNFS = require('react-native-fs');
class postapi {
    getPosts = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            let response = await axios.get(`http://172.20.80.99:8000/api/blogs`
                , {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            let data = response.data;
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    getSearchPost = async (search) => {
        console.log(search);
        let params = {
            searchitem: search,
        }
        try {
            const token = await AsyncStorage.getItem('token');
            let response = await axios.get(`http://172.20.80.99:8000/api/blogs`, {
                params: params,
                headers: { 'Authorization': 'Bearer ' + token }
            })
            let data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    lost = async (id) => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`http://172.20.80.99:8000/api/blogs/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ id })
        })
    }
    download = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            let response = await axios.get(`http://172.20.80.99:8000/api/blogs`
                , {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            let data = response.data;
            console.log(data);

            let csv = '';
            const header = Object.keys(data[0]).join(',');
            csv += header + '\n';

            data.forEach(row => {
                const values = Object.values(row).join(',');
                csv += values + '\n';
            });
            const dir = RNFS.ExternalDirectoryPath;
            const path = `${dir}/api_data.csv`;
            console.log(path);
            RNFS.writeFile(path, csv, 'utf8')
                .then(() => alert('CSV file saved successfully'))
                .catch(error => console.error(error));
        }
        catch (error) {
            console.error(error);
        }
    };
    ConfirmPost = async (title) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://172.20.80.99:8000/api/blogs/createsomething`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title })
            })
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    create = async (data) => {
        const token = await AsyncStorage.getItem('token');
        await fetch('http://172.20.80.99:8000/api/blogs/store', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        })
    }
    ConfirmEdit = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://172.20.80.99:8000/api/blogs/edit`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    edit = async (data) => {
        const token = await AsyncStorage.getItem('token');
        await fetch('http://172.20.80.99:8000/api/blogs/update', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    upload = async (file) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const base64 = await RNFetchBlob.fs.readFile(file[0].uri, 'base64')
            const resData = await fetch('http://172.20.80.99:8000/api/blogs/upload', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ file: file[0], uri: base64, })
            })
            return resData.json();
        } catch (error) {
            console.error(error);
        }
    }
}
export default new postapi();