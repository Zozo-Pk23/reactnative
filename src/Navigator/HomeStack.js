import HomeScreen from "../screens/PostList";
import CreatePostScreen from "../screens/PostCreateScreen";
import ConfirmPostScreen from "../screens/ConfirmPostScreen";
import PostEditScreen from "../screens/PostEditScreen";
import EditPostConfirm from "../screens/PostEditConfirm";
import UploadScreen from "../screens/UploadScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName="Home">
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Create' component={CreatePostScreen} />
            <Stack.Screen name='Confirm' component={ConfirmPostScreen} options={({ navigation })} />
            <Stack.Screen name='Edit' component={PostEditScreen} options={({ navigation })} />
            <Stack.Screen name="ConfirmEdit" component={EditPostConfirm} />
            <Stack.Screen name="Upload" component={UploadScreen} />
        </Stack.Navigator>
    )
}