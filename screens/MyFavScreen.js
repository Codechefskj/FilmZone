import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useFav } from '../context/FavContext'
import FilmCard from '../components/FilmCard'

export default function MyFavScreen({ navigation }) {
  const { favList } = useFav()

  if (favList.length === 0) {
    return (
      <View style={pageStyle.emptyScreen}>
        <Text style={pageStyle.emptyIcon}>🎬</Text>
        <Text style={pageStyle.emptyTitle}>No favourites yet</Text>
        <Text style={pageStyle.emptyHint}>Open any movie and tap Add to Favourites</Text>
        <Text style={pageStyle.emptyNote}>✅ Favourites are saved permanently on device</Text>
      </View>
    )
  }

  return (
    <View style={pageStyle.screen}>
      <Text style={pageStyle.headingText}>❤️ My Favourites ({favList.length})</Text>
      <FlatList
        data={favList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FilmCard
            filmInfo={item}
            onCardPress={() =>
              navigation.navigate('Films', {
                screen: 'FilmDetail',
                params: { selectedFilm: item },
              })
            }
          />
        )}
      />
    </View>
  )
}

const pageStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0d0d1a', paddingTop: 10 },
  headingText: { color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 16 },
  emptyScreen: {
    flex: 1, backgroundColor: '#0d0d1a',
    alignItems: 'center', justifyContent: 'center', padding: 30,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  emptyHint: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  emptyNote: { color: '#555', fontSize: 12, textAlign: 'center', marginTop: 8 },
})