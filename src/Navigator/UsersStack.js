import { createStackNavigator } from "@react-navigation/stack"
import UserAddScreen from "../profile/useraddscreen";
import UserList from "../profile/hello";
import UserAddConfirm from "../profile/useraddconfirmscreen";

const Stack = createStackNavigator();
export default function UsersStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name='Useradd' component={UserAddScreen} />
            <Stack.Screen name='userConfirm' component={UserAddConfirm} />
        </Stack.Navigator>
    )
}