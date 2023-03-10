import { View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import postapi from '../api/postapi';
const ConfirmPostScreen = ({ route, navigation }) => {
    const data = route.params.data;
    const create = async (data) => {
        postapi.create(data)
            .then(navigation.navigate('Home',
                { setloading: true }))
    }
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', marginTop: 50
            }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ alignSelf: 'flex-start', marginRight: 20, fontSize: 20 }}>Title</Text>
                </View>
                <View style={{ alignContent: 'flex-start', width: '45%' }}>
                    <Text style={{ fontSize: 16 }}>{data.title}</Text></View>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{ width: '50%' }}>

                    <Text style={{ alignSelf: 'flex-start', marginRight: 20, fontSize: 20 }}>Description</Text>
                </View>
                <View style={{ alignContent: 'flex-start', width: '45%' }}>
                    <Text style={{ fontSize: 16 }}>{data.description}</Text></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: "yellow", borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={() => navigation.goBack()}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{
                        backgroundColor: "#34eb9e", borderRadius: 20,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        elevation: 2,
                    }} onPress={() => create(route.params.data)}><Text style={{ color: '#000000', fontWeight: 'bold' }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ConfirmPostScreen;