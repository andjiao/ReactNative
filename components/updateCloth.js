import React from 'react';
import { View, StyleSheet } from 'react-native';
import CreateCloth from '../screens/createCloth.js';

const UpdateView = ({ cloth, updateCloth }) => {
  const handleUpdate = (updatedCloth) => {
    updateCloth(cloth.id, updatedCloth);
  };

  return (
    <View style={styles.container}>
      <CreateCloth
        initialValues={{
          price: cloth.price,
        }}
        onSubmit={handleUpdate}
        submitButtonText="Update"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default UpdateView;
