import React, { useState } from 'react';
import {SafeAreaView, TextInput, View, Text, Button} from 'react-native';

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
            <Text style={globalStyles.titleText}>Title:</Text>
            <Text style={globalStyles.paragraph}>{title}</Text>

            <Text style={globalStyles.titleText}>Description:</Text>
            <TextInput
            style={globalStyles.paragraph}
            value={description}
            onChangeText = {setDescription}
            />

             <Text style={globalStyles.titleText}>Quali:</Text>
             <Text style={globalStyles.paragraph}>{quali}</Text>

      <Text style={globalStyles.titleText}>Price:</Text>
      <TextInput
      style={globalStyles.paragraph}
       value={price} 
       onChangeText={setPrice} 
       />

      <FlatButton text="Save Changes" onPress={handleUpdate} />
        </SafeAreaView>
    )
}

export default EditForm;