import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
  import { MaterialIcons } from '@expo/vector-icons';

  import {
    getDocs,
    collection,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";


import { globalStyles } from '../styles/global';

import Card from '../components/card';
import ClothForm from "../components/clothForm.js"
import EditForm from "../components/EditForm.js"


import { db } from "../config/firebase.js";


export default function Home ({ navigation }, props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [clothList, setClothList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [clothId, setClothId] = useState(null);

  const clothsCollectionRef = collection(db, "cloths");

  const getClothById = (id) => {
    return clothList.find((cloth) => cloth.id === id);
  };


  const showModal=()=>{
    setModalOpen(true)
  }
  const hideModal=()=>{
    setModalOpen(false)
  }

  const showEdit=( id )=>{
    setClothId(id)
    setEditMode(true)
  }
  const hideEdit=()=>{
    setClothId(null)
    setEditMode(false)
  }

  
  
  const getClothList = async () => {
    try {
      const data = await getDocs(clothsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClothList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    console.log('Fetching cloth list on mount...');
    getClothList();
  }, []);

  // CRUD____________________

  const addCloth = (cloth) => {
    setClothList((currentCloths) => {
      return [cloth, ...currentCloths]
    });
    hideModal()
  };

  const updateCloth = async (id, updatedCloth)=>{
    const clothDoc = doc(db, "cloths", id)
    await updateDoc(clothDoc, updatedCloth);

    setClothList((currentCloths) => {
      return currentCloths.map((cloth)=>{
        if(cloth.id === id){
          return {...cloth, ...updatedCloth}
        }
        return cloth
      })
    });
    hideEdit()

  }


  const deleteCloth = async (id) => {
    const clothDoc = doc(db, "cloths", id);
    await deleteDoc(clothDoc);

    setClothList((currentCloths) => {
      return currentCloths.filter((cloth) => cloth.id !== id);
    });
  };


  const itemRendering = ({ item }) => {
   
    return (
      <TouchableOpacity
      onPress={() =>
        navigation.navigate('ClothDetails', {
          clothId:item.id,
          title: item.title,
          description: item.description,
          quali: item.quali,
          price: item.price 
        })
      }
    >
      <Card>
      <View style={{ flexDirection: 'row', aligncloths: 'center', justifyContent: 'space-between' }}>
        <Text style={globalStyles.titleText}>{ item.title }</Text>
        
        <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={() => showEdit(item.id)}>
            <MaterialIcons 
            name="edit" 
            size={40} 
            color="orange" 
            onPress={()=> showEdit(item.id)}
            />
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => deleteCloth(item.id)}>
            <MaterialIcons name="delete" size={40} color="red" style={{ marginRight: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      </Card>
      
    </TouchableOpacity>

    )
      
};


  return (
      <SafeAreaView style={globalStyles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose, backgroundColor:"red"}} 
              color="white"
              onPress={() => hideModal()} 
            />
            <ClothForm addCloth={addCloth}></ClothForm>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={editMode} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose, backgroundColor:"red"}} 
              color="white"
              onPress={() => hideEdit()} 
            />
            <EditForm editCloth={updateCloth} clothId={clothId} cloth={getClothById(clothId)}></EditForm>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={{...styles.modalToggle,  backgroundColor: 'green' }}
        color="white"
        onPress={() => showModal()} 
      />

     
    {clothList.length === 0 ? (
      <Text>Loading...</Text> // Or any loading indicator or message
    ) : (
      <FlatList
        data={clothList}
        renderItem={itemRendering}
        keyExtractor={(item) => item.id}
      />
    )}

      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F4A460',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});