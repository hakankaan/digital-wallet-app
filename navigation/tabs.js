import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import Svg, {Path} from 'react-native-svg'

import { Home, Scan } from '../screens'
import { COLORS, icons } from '../constants'

const Tab = createBottomTabNavigator()
 
const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name='Home'
                component={Home}
            />
            <Tab.Screen 
                name='Scan'
                component={Scan}
            />
            <Tab.Screen 
                name='User'
                component={Home}
            />
        </Tab.Navigator>
    )
}

export default Tabs