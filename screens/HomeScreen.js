import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTopRatedMovies, fetchPopularMovies } from "../data/tmdbApi";
import FilmCard from "../components/FilmCard";
import InfoBox from "../components/InfoBox";

export default function HomeScreen({ navigation }) {
  const [topFilms, setTopFilms] = useState([]);
  const [popularFilms, setPopularFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dataSource, setDataSource] = useState("api");

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setErrorMsg("");
    try {
      const topResult = await fetchTopRatedMovies();
      const popularResult = await fetchPopularMovies();
      setTopFilms(topResult.data.slice(0, 6));
      setPopularFilms(popularResult.data);
      setDataSource(popularResult.source);
      if (popularResult.source === "fallback") {
        setErrorMsg("No internet — showing offline data");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Pull down to refresh.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRefresh() {
    setIsRefreshing(true);
    await loadAllData();
    setIsRefreshing(false);
  }

  if (isLoading) {
    return (
      <View style={pageStyle.loadingScreen}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={pageStyle.loadingText}>Loading movies...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={pageStyle.screen}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor="#e50914"
        />
      }
    >
      <LinearGradient
        colors={["#e50914", "#1a1a2e"]}
        style={pageStyle.bannerSection}
      >
        <Text style={pageStyle.appTitle}>🎬 FilmZone</Text>
        <Text style={pageStyle.appSubtitle}>Discover. Watch. Enjoy.</Text>
      </LinearGradient>

      {errorMsg ? (
        <View style={pageStyle.offlineBanner}>
          <Text style={pageStyle.offlineText}>📶 {errorMsg}</Text>
        </View>
      ) : null}

      <View style={pageStyle.statsRow}>
        <InfoBox boxLabel="Popular" boxValue={popularFilms.length} />
        <InfoBox boxLabel="Top Rated" boxValue={topFilms.length} />
        <InfoBox
          boxLabel="Source"
          boxValue={dataSource === "api" ? "Live" : "Offline"}
        />
      </View>

      <Text style={pageStyle.sectionHeading}>🏆 Top Rated Films</Text>
      <FlatList
        data={topFilms}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <FilmCard
            filmInfo={item}
            onCardPress={() =>
              navigation.navigate("Films", {
                screen: "FilmDetail",
                params: { selectedFilm: item },
              })
            }
          />
        )}
      />
    </ScrollView>
  );
}

const pageStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0d0d1a" },
  loadingScreen: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { color: "#aaa", marginTop: 12, fontSize: 15 },
  bannerSection: { padding: 30, paddingTop: 50, alignItems: "center" },
  appTitle: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  appSubtitle: { color: "#ffcdd2", fontSize: 14, marginTop: 6 },
  statsRow: { flexDirection: "row", marginHorizontal: 10, marginTop: 8 },
  sectionHeading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
    marginBottom: 8,
  },
  offlineBanner: {
    backgroundColor: "#3a1a1a",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e50914",
  },
  offlineText: { color: "#e50914", fontSize: 13 },
});
