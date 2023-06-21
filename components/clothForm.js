import { useState } from 'react';
import {SafeAreaView, TextInput, View, Text } from 'react-native';

import * as yup from 'yup';
import { Formik, Field, Form } from 'formik';


import { globalStyles } from '../styles/global.js';
import { collection, addDoc, } from "firebase/firestore";
import { db } from "../config/firebase.js";


import FlatButton from '../components/button';


const clothSchema = yup.object({
  title: yup.string()
   
    .min(4),
  description: yup.string()
   ,
    quali: yup.string()
    .oneOf(['used', 'medium', 'good'])
   ,
    price: yup.number()

});


export default function ClothForm ({ addCloth }) {

  const clothCollectionRef = collection(db, "cloths")

  const onSubmitCloth = async ( values ) => {
    try {
      await addDoc(clothCollectionRef, {
        title: values.title,
        description: values. description,
        quali: values.quali,
        price:values.price

      }); 
      
      addCloth( values )
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <SafeAreaView style={globalStyles.container}>
      <Formik
      initialValues={{title: '', description:'', quali:'', price:0}}
      validationSchema ={clothSchema}
      onSubmit ={(values, actions) =>{
        actions.resetForm();
        addCloth(values);    
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

           <View> 
           <Text>Select an option:</Text>

           {({ values }) => (
        <Form>
          <View id="my-radio-group">Picked</View>
          <View role="group" aria-labelledby="my-radio-group">
            <Text>
              <Field type="radio" name="picked" value="Used" />
              One
            </Text>
            <Text>
              <Field type="radio" name="picked" value="Medium" />
              Two
            </Text>
            <View>Picked: {values.quali}</View>
          </View>

          <button type="submit">Submit</button>
        </Form>
           )}

      </View>

      <TextInput 
              style={globalStyles.input}
              placeholder='Price for item'
              onChangeText={props.handleChange('price')}
              onBlur={props.handleBlur('price')} 
              value={String(props.values.price)}
              keyboardType='numeric'
            />
            <Text style={globalStyles.errorText}>{props.touched.price && props.errors.price}</Text>

            <FlatButton addCloth={addCloth}  onPress={() => onSubmitCloth(props.values)} text='submit' />


          </SafeAreaView>
        )}
        
      </Formik>
      </SafeAreaView> 
   
  );
}