import React from 'react';
import {SafeAreaView, StyleSheet, Button, TextInput, View, Text } from 'react-native';
function extra (){

  return(
    <SafeAreaView>
<Textinput
  placeholder="title..."
  onChange={(e) => setNewClothTitle(e.target.value)}
/>
<TextInput
  placeholder="Release Date..."
  type="number"
  onChange={(e) => setNewReleaseDate(Number(e.target.value))}
/>
<Textinput
  type="checkbox"
  checked={isNewClothOscar}
  onChange={(e) => setIsNewClothOscar(e.target.checked)}
/>
</SafeAreaView>


  )
}
