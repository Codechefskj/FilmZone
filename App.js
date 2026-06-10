import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { FavProvider } from './context/FavContext'
import MainNav from './navigation/MainNav'

export default function App() {
  return (
    <FavProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
    </FavProvider>
  )
}