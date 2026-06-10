import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function InfoBox({ boxLabel, boxValue }) {
  return (
    <View style={boxStyle.container}>
      <Text style={boxStyle.numText}>{boxValue}</Text>
      <Text style={boxStyle.labelText}>{boxLabel}</Text>
    </View>
  )
}

const boxStyle = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    margin: 6,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  numText: { color: '#e50914', fontSize: 22, fontWeight: 'bold' },
  labelText: { color: '#aaa', fontSize: 12, marginTop: 4, textAlign: 'center' },
})