import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/homeScreen";
import CreatePostScreen from "../screens/createpostscreen";
import ConfirmPostScreen from "../screens/confirmpostscreen";
import PostEditScreen from "../screens/editpostscreen";
import EditPostConfirm from "../screens/editpostconfirm";
const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Create' component={CreatePostScreen} />
            <Stack.Screen name='Confirm' component={ConfirmPostScreen} options={({ navigation })} />
            <Stack.Screen name='Edit' component={PostEditScreen} options={({ navigation })} />
            <Stack.Screen name="ConfirmEdit" component={EditPostConfirm} />
        </Stack.Navigator>
    )
}