import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';

import instagram from './assets/instagram.png';

const Routes = createAppContainer(
  createStackNavigator({
    Feed
  }, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitle: <Image source={instagram} />,
      headerStyle: {
        backgroundColor: '#F5F5F5'
      },
    }    
  })
);

export default Routes;
