import React from 'react';
import {SafeAreaView, StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/button.js';

import { db, auth } from "../config/firebase.js"

import {addDoc, collection } from "firebase/firestore";

const clothSchema = yup.object({
  title: yup.string()
    
    .min(4),
  description: yup.string()
    
    .min(1),
  rating: yup.string()
    
 
});

export default function ReviewForm({ addReview }) {

  const clothsCollectionRef = collection(db, "cloths");

  const onSubmitCloth = async () => {
    try {
      await addDoc(clothCollectionRef, {
        title: newTitle,
        description: newDescription,
        quali: newQuali,
        price: newPrice,
        // userId: auth?.currentUser?.uid, // we use questinmark bc, we only want to check currentUser, if they are logged ind
      });
      geList();
    } catch (err) {
      console.error(err);
    }
  };
    


  return (
       <SafeAreaView style={globalStyles.container}>
       <Formik
        initialValues={{ title: '', description: '', rating: '' }}
        validationSchema={clothSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          // addReview(values);
          addDoc(clothCollectionRef, values)
          .then(() => {
     
            console.log('Data added to Firestore');
            
          })
          .catch((error) => {
            console.error('Error adding data to Firestore:', error);
          
          });
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Review title'
              onChangeText={props.handleChange('title')}
              onBlur={props.handleBlur('title')} 
              value={props.values.title}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Cloth Description'
              onChangeText={props.handleChange('description')}
              onBlur={props.handleBlur('description')}
              value={props.values.body}
            />
            <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text>

            <TextInput 
              style={globalStyles.input}
              placeholder='Rating (1 - 5)'
              onChangeText={props.handleChange('rating')}
              onBlur={props.handleBlur('rating')} 
              value={props.values.rating}
              keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>
            
            <FlatButton onPress={addReview} text='submit' />
          </View>
        )}
      </Formik>
       </SafeAreaView>
      
  
    
  );
}