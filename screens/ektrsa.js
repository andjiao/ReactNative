import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';

export default function ekstra() {
  return (

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
   
        
   
  );
}



