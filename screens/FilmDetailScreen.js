import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IMG_BASE } from "../data/tmdbApi";
import { useFav } from "../context/FavContext";

export default function FilmDetailScreen({ route }) {
  const { selectedFilm } = route.params;
  const { favList, addFilm, removeFilm } = useFav();

  if (!selectedFilm) {
    return (
      <View style={pageStyle.screen}>
        <Text style={pageStyle.errMsg}>
          Film not found. Please go back and try again.
        </Text>
      </View>
    );
  }

  const isInFav = favList.some((item) => item.id === selectedFilm.id);
  const releaseYear = selectedFilm.release_date
    ? selectedFilm.release_date.split("-")[0]
    : "N/A";

  const rating = selectedFilm.vote_average
    ? selectedFilm.vote_average.toFixed(1)
    : "N/A";

  const genre = selectedFilm.genre || "Unknown";

  return (
    <ScrollView style={pageStyle.screen}>
      <View style={pageStyle.posterWrapper}>
        {selectedFilm.poster_path ? (
          <Image
            source={{ uri: `${IMG_BASE}${selectedFilm.poster_path}` }}
            style={pageStyle.posterImg}
          />
        ) : (
          <View style={pageStyle.noPosterBox}>
            <Text style={pageStyle.noPosterText}>🎬</Text>
          </View>
        )}
        <LinearGradient
          colors={["transparent", "#0d0d1a"]}
          style={pageStyle.gradientOverlay}
        />
      </View>

      <View style={pageStyle.contentArea}>
        <Text style={pageStyle.filmTitle}>{selectedFilm.title}</Text>
        <Text style={pageStyle.ratingLine}>⭐ {rating} / 10</Text>

        <View style={pageStyle.tagsRow}>
          <View style={pageStyle.tagItem}>
            <Text style={pageStyle.tagText}>📅 {releaseYear}</Text>
          </View>

          <View style={pageStyle.tagItem}>
            <Text style={pageStyle.tagText}>
              🌍 {selectedFilm.original_language?.toUpperCase()}
            </Text>
          </View>

          <View style={pageStyle.tagItem}>
            <Text style={pageStyle.tagText}>🎭 {genre}</Text>
          </View>

          <View style={pageStyle.tagItem}>
            <Text style={pageStyle.tagText}>
              🗳️ {selectedFilm.vote_count} votes
            </Text>
          </View>
        </View>

        <Text style={pageStyle.overviewHead}>Overview</Text>
        <Text style={pageStyle.overviewBody}>
          {selectedFilm.overview || "No description available for this film."}
        </Text>

        <TouchableOpacity
          style={[pageStyle.favBtn, isInFav && pageStyle.favBtnActive]}
          onPress={() =>
            isInFav ? removeFilm(selectedFilm.id) : addFilm(selectedFilm)
          }
          activeOpacity={0.8}
        >
          <Text style={pageStyle.favBtnText}>
            {isInFav ? "❤️  Remove from Favourites" : "🤍  Add to Favourites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const pageStyle = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0d0d1a" },
  errMsg: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    padding: 20,
  },
  posterWrapper: { height: 380, position: "relative" },
  posterImg: { width: "100%", height: "100%" },
  noPosterBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  noPosterText: { fontSize: 60 },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  contentArea: { padding: 20 },
  filmTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  ratingLine: { color: "#e50914", fontSize: 16, marginBottom: 14 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  tagItem: {
    backgroundColor: "#1a1a2e",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2a2a4a",
  },
  tagText: { color: "#ccc", fontSize: 13 },
  overviewHead: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overviewBody: { color: "#bbb", fontSize: 14, lineHeight: 22 },
  favBtn: {
    marginTop: 20,
    backgroundColor: "#1a1a2e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e50914",
  },
  favBtnActive: { backgroundColor: "#e50914" },
  favBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
