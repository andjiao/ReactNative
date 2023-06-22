import {SafeAreaView, TextInput, View, Text } from 'react-native';

import React, { useState, useEffect } from 'react';
import { Picker } from "@react-native-picker/picker"

import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';


import { globalStyles } from '../styles/global.js';
import { collection, addDoc, } from "firebase/firestore";
import { db, storage } from "../config/firebase.js";


import FlatButton from '../components/button';


const clothSchema = yup.object({
  title: yup.string().min(3),
  description: yup.string(),
    price: yup.number(),
    quali: yup.number()

});


export default function ClothForm ({ addCloth }) {

  const onSubmitCloth = async ( values ) => {
    const clothCollectionRef = collection(db, 'cloths');
    try {
      await addDoc(clothCollectionRef, {
        title: values.title,
        description: values. description,
        price:values.price,
        quali:values.quali

      }); 
      
      addCloth( values )
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <SafeAreaView style={globalStyles.container}>
      <Formik
      initialValues={{title: '', description:'', price:'', quali: 'used'}}
      validationSchema ={clothSchema}
      onSubmit ={(values, actions) =>{
        actions.resetForm();
        onSubmitCloth(values);    
      }}
      >
        {props => (
          <SafeAreaView>
            <TextInput
            style={globalStyles.input}
            placeholder = "Title"
            onChangeText={props.handleChange("title")}
            onBlur ={props.handleBlur("title")}
            value={props.values.title}
            />
           <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>
           
            <TextInput
            style={globalStyles.input}
            multiline minHeight={60}
            placeholder = "Cloth Description"
            onChangeText={props.handleChange("description")}
            onBlur ={props.handleBlur("description")}
            value={props.values.description}
            />
           <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text>
     
      <TextInput 
              style={globalStyles.input}
              placeholder='Price for item'
              onChangeText={props.handleChange('price')}
              onBlur={props.handleBlur('price')} 
              value={String(props.values.price)}
              keyboardType='numeric'
            />
            
            <Text style={globalStyles.errorText}>{props.touched.price && props.errors.price}</Text>

            <View style={globalStyles.container}>
      <Picker
        selectedValue={props.values.quali}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => props.setFieldValue('quali', itemValue)}
      >
        <Picker.Item label="Used" value="used" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="New" value="new" />
      </Picker>
    </View>
            <FlatButton addCloth={addCloth}  onPress={() => onSubmitCloth(props.values)} text='submit' />


          </SafeAreaView>
        )}
        
      </Formik>
      </SafeAreaView> 
   
  );
}