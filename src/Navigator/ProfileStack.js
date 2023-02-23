import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../profile/myprofilescreen";
import PasswordReset from "../profile/passwordresetscreen";
import ProfileEditConfirm from "../profile/profileeditconfirm";
import ProfileEditScreen from "../profile/profileeditscreen";
const Stack = createStackNavigator();
export default function ProfileStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='myProfile' component={MyProfile} />
            <Stack.Screen name='editProfile' component={ProfileEditScreen} />
            <Stack.Screen name='Gg' component={ProfileEditConfirm} />
            <Stack.Screen name="passwordReset" component={PasswordReset} />
        </Stack.Navigator>
    )
}