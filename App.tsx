import React from 'react';
import {color_basic} from './styles';
import TodoListView from './todo/TodoListView';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AlarmView from './alarm/AlarmView';
import Timer from './timer/TimerView';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="TODO"
          component={TodoListView}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color_basic}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ALARM"
          component={AlarmView}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="alarm"
                color={color_basic}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TIMER"
          component={Timer}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="timer"
                color={color_basic}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
