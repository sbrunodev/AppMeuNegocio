import React, {Component} from 'react';
import {Text, View} from 'react-native';


import AppNavigation from './navigation/AppNavigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppNavigation/>
    );
  }
}


