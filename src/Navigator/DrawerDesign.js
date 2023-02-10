import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View } from 'react-native-gesture-handler';
const DrawerDesign = props => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ justifyContent: 'space-between', height: 450 }}>
                <View style={{ paddingLeft: 30 }}>
                    <DrawerItem
                        label="Home"
                        inactiveTintColor="#fff"
                        onPress={() =>
                            props.navigation.navigate('Home')
                        }>
                    </DrawerItem>
                </View>

                <DrawerItem
                    style={{ paddingLeft: 30 }}
                    label="Log Out"
                    inactiveTintColor="#fff"
                    onPress={() => navigation.navigate('Login')}></DrawerItem>
            </View>
        </DrawerContentScrollView>
    )
}
export default DrawerDesign