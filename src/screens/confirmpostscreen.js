import { View, Text, Button } from 'react-native';
const ConfirmPostScreen = ({ route, navigation }) => {
    const { title, description } = route.params;
    const create = async (title, description) => {
        await fetch('http://10.0.2.2:8000/api/blogs/store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title, description)
        }).then(navigation.navigate('Home'))
    }
    return (
        <View style={{ backgroundColor: 'cyan', flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 40 }}>Post Confirm Form</Text>
            <View style={{
                flexDirection: 'row', marginVertical: 100
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Title</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', right: 40 }}>{JSON.stringify(title.title)}</Text>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{ alignSelf: 'center', marginRight: 20, fontSize: 20 }}>Description</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', right: 40 }}>{JSON.stringify(title.description)}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 160, }}>
                <View>
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                </View>
                <View style={{ marginLeft: 200 }}>
                    <Button title="Confrim" onPress={() => create(title, description)} />
                </View>
            </View>
        </View>
    )
}
export default ConfirmPostScreen;