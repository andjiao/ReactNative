import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import React from 'react';
import Header from '../components/header';
import Home from '../screens/home';
import ClothDetails from '../screens/clothDetails';



function HomeStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={Home} 
            />
            <Stack.Screen
            name="ClothDetails"
            component={ClothDetails}
            />
        </Stack.Navigator>
    )
}



// home stack navigator screens


export default HomeStack;



/* const screens = {
Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='GameZone' navigation={navigation} />
      }
    },
  },
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: {
      title: 'Review Details',
    }
  },
}; 

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

*/
