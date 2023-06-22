import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../components/card';

export default function ReviewDetails({route, navigation }) {
  
  const images = {
    ratings: {
      '1': require('../assets/rating-1.png'),
      '2': require('../assets/rating-2.png'),
      '3': require('../assets/rating-3.png'),
      '4': require('../assets/rating-4.png'),
      '5': require('../assets/rating-5.png'),
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
        <View style={styles.rating}>
          <Text>GameZone rating: </Text>
          <Text style={globalStyles.paragraph}>
          Qualitiy: {JSON.stringify(route.params.quali || 'NO-QUALI')}
          <Image source={images.ratings[route.params.rating]} style={styles.ratingImage}  />
          </Text>

         
          
        </View> 
      </Card>
  
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  ratingImage: {
    width: 90, 
    height: 27,
    marginLeft: 5,
  },
});

