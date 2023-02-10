import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import UsersStack from './UsersStack';
import ProfileStack from './ProfileStack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

export default function MyDrawer({ navigation }) {
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
            return (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem label="Logout" onPress={() => logout()} />
                </DrawerContentScrollView>
            )
        }}>
            <Drawer.Screen name="HomeStack" component={HomeStack} />
            <Drawer.Screen name='Users' component={UsersStack} />
            <Drawer.Screen name="Profile" component={ProfileStack} />
        </Drawer.Navigator>
    )
        ;
}