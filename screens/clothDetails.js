import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../components/card';

export default function ReviewDetails({route, navigation }) {

  const images = {
    qualies: {
      'used': require('../assets/bad.png'),
      'medium': require('../assets/good2.png'),
      'new': require('../assets/bedst.png'),
    }
  };
  
  return (
    <SafeAreaView style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          {JSON.stringify(route.params.title || 'NO-TITLE')}
        </Text>
        <Text style={globalStyles.paragraph}>
          Description: {JSON.stringify(route.params.description || 'NO-description')}
        </Text>
        <Text style={globalStyles.paragraph}>
          Price: {JSON.stringify(route.params.price || 'NO-PRICE')}
        </Text>
        <View style={styles.quali}>
          <Text style={styles.qualiText}>Qualitiy: </Text>
          <Text style={globalStyles.paragraph}>
          <Image source={images.qualies[route.params.quali]} style = {styles.qualiIcon}  />
          </Text>
          </View>
    
      </Card>
  
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  quali: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
  },
  qualiText: {
    marginRight: 8,
  },
  qualiIcon: {
    width: 40,
    height: 40,
      
  },
});

