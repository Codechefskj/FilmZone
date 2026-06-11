import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { IMG_BASE } from "../data/tmdbApi";
import { GENRE_MAP } from '../data/tmdbApi'


export default function FilmCard({ filmInfo, onCardPress }) {
  const posterUrl = filmInfo.poster_path
    ? { uri: `${IMG_BASE}${filmInfo.poster_path}` }
    : null;

  const releaseYear = filmInfo.release_date
    ? filmInfo.release_date.split("-")[0]
    : "N/A";

  const rating = filmInfo.vote_average
    ? filmInfo.vote_average.toFixed(1)
    : "N/A";

  const genre = filmInfo.genre ||
  (filmInfo.genre_ids && filmInfo.genre_ids[0]
    ? GENRE_MAP[filmInfo.genre_ids[0]]
    : 'Unknown')

  return (
    <TouchableOpacity
      style={cardStyle.wrapper}
      onPress={onCardPress}
      activeOpacity={0.8}
    >
      <View style={cardStyle.posterBox}>
        {posterUrl ? (
          <Image source={posterUrl} style={cardStyle.posterImg} />
        ) : (
          <View style={cardStyle.noPoster}>
            <Text style={cardStyle.noPosterText}>🎬</Text>
          </View>
        )}
      </View>
      <View style={cardStyle.infoSection}>
        <Text style={cardStyle.metaText}>📅 {releaseYear}</Text>

        <Text style={cardStyle.metaText}>
          🌍 {filmInfo.original_language?.toUpperCase()}
        </Text>

        <Text style={cardStyle.metaText}>🎭 {genre}</Text>

        <Text style={cardStyle.metaText} numberOfLines={2}>
          {filmInfo.overview
            ? filmInfo.overview.substring(0, 80) + "..."
            : "No description available"}
        </Text>
        <View style={cardStyle.ratingBadge}>
          <Text style={cardStyle.ratingText}>⭐ {rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const cardStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    marginBottom: 14,
    marginHorizontal: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#2a2a4a",
  },
  posterBox: {
    width: 100,
    height: 150,
  },
  posterImg: {
    width: 100,
    height: 150,
    backgroundColor: "#333",
  },
  noPoster: {
    width: 100,
    height: 150,
    backgroundColor: "#2a2a4a",
    alignItems: "center",
    justifyContent: "center",
  },
  noPosterText: { fontSize: 30 },
  infoSection: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  filmTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  metaText: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 3,
  },
  ratingBadge: {
    backgroundColor: "#e50914",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  ratingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
