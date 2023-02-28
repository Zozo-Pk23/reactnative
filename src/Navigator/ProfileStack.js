import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../profile/MyProfileScreen";
import PasswordReset from "../profile/PasswordResetScreen";
import ProfileEditConfirm from "../profile/ProfileEditConfirm";
import ProfileEditScreen from "../profile/ProfileEditScreen";
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