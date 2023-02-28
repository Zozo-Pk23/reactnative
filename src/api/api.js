import { BASE_URL } from "../../Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";
class api {
    getAllUsers = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await axios.get(`${BASE_URL}/profile/`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}/getUser`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            data = response.data;
            // console.log(data);
            return data;
        } catch (error) {
            if (error.response === 429) {

            } else {
                console.error(error);
            }
        }
    };
    getSearchUser = async (searchname, searchemail, createdfrom, createdto) => {
        const token = await AsyncStorage.getItem('token');

        const date = new Date(createdfrom);
        const dateone = new Date(createdto);
        let formattedDate = null;
        let formattedDateOne = null;
        if (date && !isNaN(date.getTime())) {
            formattedDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        }

        if (dateone && !isNaN(dateone.getTime())) {
            formattedDateOne = `${dateone.getFullYear()}-${("0" + (dateone.getMonth() + 1)).slice(-2)}-${("0" + dateone.getDate()).slice(-2)}`;
        }
        let params = {
            searchname: searchname,
            searchemail: searchemail,
        }
        if (formattedDateOne != null) {
            params.createdto = formattedDateOne;
        }
        if (formattedDate != null) {
            params.createdfrom = formattedDate;
        }
        console.log(params);
        try {
            const response = await axios.get(`${BASE_URL}/profile`,
                {
                    params: params,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }
            )
            const data = await response.data;
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }
    cut = async (id) => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`${BASE_URL}/profile/delete`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
    }
    Confrim = async (name, email, password, confirmpassword, phone, address, selectedDate, selectedImage, value, uri) => {
        try {

            const token = await AsyncStorage.getItem('token');

            const base64 = selectedImage ? await RNFetchBlob.fs.readFile(selectedImage.assets[0].uri, 'base64') : null;

            const response = await fetch(`${BASE_URL}/profile/create`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, password: password, confirmpassword: confirmpassword, address: address, phone: phone, date_of_birth: selectedDate, selectedImage: base64, type: value, uri: uri })
            })
            const result = await response.json();
            return { result, base64 };
        }
        catch (error) {
            console.error(error);
        }
    }
    create = async (data) => {
        const token = await AsyncStorage.getItem('token');
        await fetch(`${BASE_URL}/profile/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    ConfirmEdit = async (name) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/profile/edit`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name })
            })
            return response;
        }
        catch (error) {
            console.error(error);
        }
    }
    Edit = async (data) => {
        if (typeof data.selectedImage === 'object') {

            const token = await AsyncStorage.getItem('token');
            const base64 = await RNFetchBlob.fs.readFile(data.selectedImage['assets'][0]['uri'], 'base64');

            await fetch(`${BASE_URL}/profile/update`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data, newphoto: base64 })
            })
        }
        else {

            const token = await AsyncStorage.getItem('token');
            await fetch(`${BASE_URL}/profile/update`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            })
        }
    }
    ForgotPassword = async (data) => {
        console.log(data);
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://172.20.80.99:8000/api/profile/passwordreset`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data, oldpassword: data.password, newpassword: data.newpassword, password_confirmation: data.confirmpassword })
        })
        const resData = response.json();
        console.log(resData);
        return resData;
    }
}
export default new api();