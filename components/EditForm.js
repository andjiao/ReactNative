import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Text, Button} from 'react-native';
import { Picker } from "@react-native-picker/picker"


import { globalStyles } from '../styles/global.js';


const EditForm = ({ editCloth, cloth }) => {
  const [id, setId] = useState(cloth?.id);
  const [title, setTitle] = useState(cloth?.title);
  const [description, setDescription] = useState(cloth?.description);
  const [quali, setQuali] = useState(cloth?.quali);
  const [price, setPrice] = useState(cloth?.price);

  
  const handleUpdate = () => {
    const updatedCloth = {
      id: id,
        title: title,
        description: description,
        price: price,
        quali: quali,
    };
    console.log("this is the id", cloth.id)

    editCloth(cloth.id, updatedCloth)

    
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

      <View style={globalStyles.container}>
      <Picker
        selectedValue={quali}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setQuali(itemValue)}
      >
        <Picker.Item label="Used" value="used" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="New" value="new" />
      </Picker>
    </View>

      <Button editCloth ={editCloth} title="Save Changes" onPress={handleUpdate} />
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