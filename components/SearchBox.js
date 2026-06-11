import React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function SearchBox({ typedText, onTextChange }) {
  return (
    <View style={boxStyle.wrapper}>
      <Ionicons name="search-outline" size={18} color="#777" style={{ marginRight: 8 }} />
      <TextInput
        style={boxStyle.inputField}
        placeholder="Search movies by name..."
        placeholderTextColor="#666"
        value={typedText}
        onChangeText={onTextChange}
      />
      {typedText.length > 0 && (
        <TouchableOpacity onPress={() => onTextChange('')} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={18} color="#aaa" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const boxStyle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  inputField: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 12,
  },
})