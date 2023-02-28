import { createStackNavigator } from "@react-navigation/stack"
import UserAddScreen from "../profile/UserAddScreen";
import UserList from "../profile/UsersList";
import UserAddConfirm from "../profile/UserAddConfirm";

const Stack = createStackNavigator();
export default function UsersStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="UserList">
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name='Useradd' component={UserAddScreen} />
            <Stack.Screen name='userConfirm' component={UserAddConfirm} />
        </Stack.Navigator>
    )
}