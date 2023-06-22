import React, { useState } from 'react';
import {StyleSheet,SafeAreaView, TextInput, View, Text, Button} from 'react-native';

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
            <View style={styles.row}>
            <Text style={globalStyles.titleText}>Title:</Text>
            <Text style={[globalStyles.paragraph, styles.text]}>{title}</Text>
            </View>

            <View style={styles.row}>
            <Text style={globalStyles.titleText}>Description:</Text>
            <TextInput
            style={[globalStyles.input, styles.text]}
            multiline minHeight={60}
            value={description}
            onChangeText = {setDescription}
            />
            </View>         

<View style={styles.row}>
  <Text style={globalStyles.titleText}>Quali:</Text>
  <Text style={[globalStyles.paragraph, styles.text]}>{quali}</Text>
</View>

<View style ={styles.row}>
<Text style={globalStyles.titleText}>Price:</Text>
      <TextInput
      style={[globalStyles.input, styles.text]}
       value={price} 
       onChangeText={setPrice} 
       />

</View>

      

      <FlatButton text="Save Changes" onPress={handleUpdate} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
        marginLeft: 10, 
      
      },
  });

export default EditForm;