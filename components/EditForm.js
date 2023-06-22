import {SafeAreaView, TextInput, View, Text } from 'react-native';

import { Formik, Field, Form } from 'formik';


import { globalStyles } from '../styles/global.js';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";


import FlatButton from '../components/button';


const EditForm = ({ editCloth, clothId, cloth }) => {
    const [price, setPrice] = useState(cloth.price);

  
  const handleUpdate = () => {
    const updatedCloth = {
        description: description,
      price: price,
    };

    editCloth(clothId, updatedCloth);
  };
   
  

    return (
        <SafeAreaView>
            <Text>Title:</Text>
            <Text>{title}</Text>

            <Text>Description:</Text>
            <TextInput
            value={description}
            onChangeText = {setDescription}
            ></TextInput>

             <Text>Quali:</Text>
             <Text>{quali}</Text>

      <Text>Price:</Text>
      <TextInput value={price} onChangeText={setPrice} />

      <Button title="Save Changes" onPress={handleUpdate} />
        </SafeAreaView>
    )
}

export default EditForm;