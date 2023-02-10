import { View, Text, Button } from 'react-native';
const EditPostConfirm = ({ route, navigation }) => {
    const edit = async () => {
        console.log(route.params);
        await fetch('http://10.0.2.2:8000/api/blogs/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route.params)
        }).then(navigation.navigate('Home'))
    }
    return (
        <View style={{ backgroundColor: 'cyan', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', marginVertical: 100
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Title</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', right: 40 }}>{route.params.id.title}</Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Description</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', right: 40 }}>{route.params.id.description}</Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Status</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', right: 40 }}>{route.params.id.status}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 160, }}>
                <View>
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                </View>
                <View style={{ marginLeft: 200 }}>
                    <Button title="Confrim" onPress={() => edit()} />
                </View>
            </View>
        </View>
    )
}
export default EditPostConfirm;