import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AllMoviesScreen from '../screens/AllMoviesScreen';
import FilmDetailScreen from '../screens/FilmDetailScreen';
import MyFavScreen from '../screens/MyFavScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const BottomTab = createBottomTabNavigator();
const FilmStack = createNativeStackNavigator();

function FilmsStackNav() {
  return (
    <FilmStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <FilmStack.Screen
        name="AllMovies"
        component={AllMoviesScreen}
        options={{
          title: 'All Movies',
        }}
      />

      <FilmStack.Screen
        name="FilmDetail"
        component={FilmDetailScreen}
        options={{
          title: 'Film Details',
        }}
      />
    </FilmStack.Navigator>
  );
}

export default function MainNav() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Films':
              iconName = focused ? 'film' : 'film-outline';
              break;

            case 'Favourites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;

            default:
              iconName = 'ellipse-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: '#e50914',
        tabBarInactiveTintColor: '#888',

        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#2a2a4a',
          borderTopWidth: 1,

          height: 75,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 2,
        },

        headerShown: false,
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
      />

      <BottomTab.Screen
        name="Films"
        component={FilmsStackNav}
      />

      <BottomTab.Screen
        name="Favourites"
        component={MyFavScreen}
      />

      <BottomTab.Screen
        name="Profile"
        component={MyProfileScreen}
      />
    </BottomTab.Navigator>
  );
}