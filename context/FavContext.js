import React, { createContext, useContext, useReducer, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FavContext = createContext()

const startingState = { favList: [] }

function favReducer(currentState, action) {
  switch (action.type) {
    case 'LOAD_SAVED':
      return { favList: action.payload }
    case 'ADD_FILM':
      return { favList: [...currentState.favList, action.payload] }
    case 'REMOVE_FILM':
      return {
        favList: currentState.favList.filter(item => item.id !== action.payload),
      }
    default:
      return currentState
  }
}

export function FavProvider({ children }) {
  const [state, dispatch] = useReducer(favReducer, startingState)

  useEffect(() => {
    async function loadSavedFavs() {
      try {
        const savedData = await AsyncStorage.getItem('MY_FAV_FILMS')
        if (savedData !== null) {
          dispatch({ type: 'LOAD_SAVED', payload: JSON.parse(savedData) })
        }
      } catch (err) {
        console.log('Error loading favourites:', err)
      }
    }
    loadSavedFavs()
  }, [])

  useEffect(() => {
    async function saveFavs() {
      try {
        await AsyncStorage.setItem('MY_FAV_FILMS', JSON.stringify(state.favList))
      } catch (err) {
        console.log('Error saving favourites:', err)
      }
    }
    saveFavs()
  }, [state.favList])

  function addFilm(filmData) {
    const alreadyExists = state.favList.find(item => item.id === filmData.id)
    if (!alreadyExists) {
      dispatch({ type: 'ADD_FILM', payload: filmData })
    }
  }

  function removeFilm(filmId) {
    dispatch({ type: 'REMOVE_FILM', payload: filmId })
  }

  return (
    <FavContext.Provider value={{ ...state, addFilm, removeFilm }}>
      {children}
    </FavContext.Provider>
  )
}

export function useFav() {
  return useContext(FavContext)
}