import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Text, Button} from 'react-native';

import { Formik, Field, Form } from 'formik';


import { globalStyles } from '../styles/global.js';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";


import FlatButton from '../components/button';


const EditForm = ({ editCloth, clothId, cloth }) => {
  const [title, setTitle] = useState(cloth?.title);
  const [description, setDescription] = useState(cloth?.description);
  const [quali, setQuali] = useState(cloth?.quali);
  const [price, setPrice] = useState(cloth?.price);

  
  const handleUpdate = () => {
    const updatedCloth = {
        title: title,
        description: description,
        quali: quali,
        price: price,
    };

    editCloth(clothId, updatedCloth);
  };
   
  

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style ={styles.row}>
            <Text style={globalStyles.titleText}>Title:</Text>
            <Text style={{...globalStyles.paragraph,}}>{title}</Text>
            </View>
      
            <Text style={globalStyles.titleText}>Description:</Text>
            <TextInput style={globalStyles.input}
            value={description}
            onChangeText = {setDescription}
            />

            

      <Text style={globalStyles.titleText}>Price:</Text>
      <TextInput style={{...globalStyles.input}} value={price} onChangeText={setPrice} />

      <Button editCloth ={editCloth}title="Save Changes" onPress={handleUpdate} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
   
  });

export default EditForm;