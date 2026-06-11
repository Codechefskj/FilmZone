import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFav } from '../context/FavContext'
import InfoBox from '../components/InfoBox'

export default function MyProfileScreen() {
  const { favList } = useFav()

  const totalFavs = favList.length
  const avgFavRating = favList.length > 0
    ? (favList.reduce((sum, f) => sum + (f.vote_average || 0), 0) / favList.length).toFixed(1)
    : '0.0'
  const totalVotes = favList.reduce((sum, f) => sum + (f.vote_count || 0), 0)

  return (
    <ScrollView style={pageStyle.screen}>
      <LinearGradient colors={['#1a1a2e', '#e50914']} style={pageStyle.profileTop}>
        <Text style={pageStyle.avatarText}>👤</Text>
        <Text style={pageStyle.profileName}>Sambhav Jha</Text>
        <Text style={pageStyle.profileInfo}>Computer Science • 3rd Year</Text>
      </LinearGradient>

      <Text style={pageStyle.sectionHead}>My Statistics</Text>
      <View style={pageStyle.statRow}>
        <InfoBox boxLabel="Saved Films" boxValue={totalFavs} />
        <InfoBox boxLabel="Avg Rating" boxValue={avgFavRating} />
      </View>
      <View style={pageStyle.statRow}>
        <InfoBox boxLabel="Total Votes" boxValue={totalVotes} />
        <InfoBox boxLabel="Data" boxValue="Live" />
      </View>

      <Text style={pageStyle.sectionHead}>ℹ️ About App</Text>
      <View style={pageStyle.aboutCard}>
        <Text style={pageStyle.aboutLine}>📱  FilmZone v2.0</Text>
        <Text style={pageStyle.aboutLine}>⚛️  Built with React Native + Expo</Text>
        <Text style={pageStyle.aboutLine}>🎬  Powered by TMDB API</Text>
        <Text style={pageStyle.aboutLine}>💾  Favourites saved with AsyncStorage</Text>
        <Text style={pageStyle.aboutLine}>🔄  Pull to refresh on all screens</Text>
        <Text style={pageStyle.aboutLine}>🎓  NAAI College Assignment</Text>
      </View>
    </ScrollView>
  )
}

const pageStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0d0d1a' },
  profileTop: { alignItems: 'center', padding: 40, paddingTop: 60 },
  avatarText: { fontSize: 70, marginBottom: 12 },
  profileName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileInfo: { color: '#ffcdd2', fontSize: 14, marginTop: 5 },
  sectionHead: { color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 16, marginBottom: 8 },
  statRow: { flexDirection: 'row', marginHorizontal: 10 },
  aboutCard: {
    margin: 16, backgroundColor: '#1a1a2e',
    borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#2a2a4a',
  },
  aboutLine: { color: '#aaa', fontSize: 14, marginBottom: 10 },
})