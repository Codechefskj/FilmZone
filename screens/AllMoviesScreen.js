import React, { useState, useEffect } from 'react'
import {
  View, FlatList, Text,
  RefreshControl, StyleSheet, ActivityIndicator
} from 'react-native'
import { fetchPopularMovies, searchMovieByName } from '../data/tmdbApi'
import FilmCard from '../components/FilmCard'
import SearchBox from '../components/SearchBox'

export default function AllMoviesScreen({ navigation }) {
  const [allFilms, setAllFilms] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [dataSource, setDataSource] = useState('api')

  useEffect(() => {
    loadMovies()
  }, [])

  useEffect(() => {
    if (searchText.trim().length === 0) {
      setDisplayList(allFilms)
      setErrorMsg('')
      return
    }
    const searchTimer = setTimeout(() => {
      runSearch(searchText)
    }, 500)
    return () => clearTimeout(searchTimer)
  }, [searchText, allFilms])

  async function loadMovies() {
    setErrorMsg('')
    try {
      const result = await fetchPopularMovies()
      setAllFilms(result.data)
      setDisplayList(result.data)
      setDataSource(result.source)
    } catch (err) {
      setErrorMsg('Failed to load movies.')
    }
  }

  async function runSearch(query) {
    setIsSearching(true)
    setErrorMsg('')
    try {
      const result = await searchMovieByName(query)
      if (result.data.length === 0) {
        setErrorMsg(`No movies found for "${query}"`)
      }
      setDisplayList(result.data)
    } catch (err) {
      setErrorMsg('Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true)
    setSearchText('')
    await loadMovies()
    setIsRefreshing(false)
  }

  return (
    <View style={pageStyle.screen}>
      <SearchBox typedText={searchText} onTextChange={setSearchText} />

      {dataSource === 'fallback' && (
        <View style={pageStyle.offlineBanner}>
          <Text style={pageStyle.offlineText}>📶 Offline — showing saved data</Text>
        </View>
      )}

      {isSearching && <ActivityIndicator color="#e50914" style={{ marginTop: 10 }} />}

      {errorMsg ? <Text style={pageStyle.errorMsg}>{errorMsg}</Text> : null}

      <FlatList
        data={displayList}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#e50914" />
        }
        renderItem={({ item }) => (
          <FilmCard
            filmInfo={item}
            onCardPress={() => navigation.navigate('FilmDetail', { selectedFilm: item })}
          />
        )}
        ListEmptyComponent={
          !isSearching && !errorMsg ? (
            <Text style={pageStyle.emptyMsg}>No movies to show.</Text>
          ) : null
        }
      />
    </View>
  )
}

const pageStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0d0d1a', paddingTop: 6 },
  offlineBanner: {
    backgroundColor: '#3a1a1a', padding: 8, alignItems: 'center',
  },
  offlineText: { color: '#e50914', fontSize: 12 },
  errorMsg: { color: '#e50914', textAlign: 'center', margin: 16, fontSize: 14 },
  emptyMsg: { color: '#aaa', textAlign: 'center', marginTop: 40, fontSize: 15 },
})