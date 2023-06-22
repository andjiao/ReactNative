import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const ImagePicker = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const storage = getStorage();

  const imagesListRef = ref(storage, 'images/');

  const uploadFile = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Choose Image" onPress={uploadFile} />
      {imageUrls.map((url) => (
        <Image key={url} source={{ uri: url }} style={{ width: 200, height: 200 }} />
      ))}
    </View>
  );
};

export default ImagePicker;
