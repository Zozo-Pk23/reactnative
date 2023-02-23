import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ConfirmPostScreen = ({ route, navigation }) => {
    const data = route.params.data;
    const create = async (data) => {
        const token = await AsyncStorage.getItem('token');
        await fetch('http://172.20.80.99:8000/api/blogs/store', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        }).then(navigation.navigate('Home', { setloading: true }))
    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 50
            }}>
                <Text style={{ fontSize: 20 }}>Title</Text>
                <Text style={{ fontSize: 16 }}>{data.title}</Text>
            </View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between'
            }}>
                <Text style={{ fontSize: 20 }}>Description</Text>
                <Text style={{ fontSize: 16, }}>{data.description}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ borderRadius: 30, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#2196F3', marginTop: 10, marginHorizontal: 20 }}
                        onPress={() => create(route.params.data)}
                    >
                        <Text style={{ fontSize: 14, color: 'white' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ConfirmPostScreen;