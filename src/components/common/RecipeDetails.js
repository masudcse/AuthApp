import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class RecipeDetails extends Component {
 
  render() {
    const {title,publisher,titleStyle}=this.props;
    return (
        <View style={{padding:20}}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={styles.publisher}>{publisher}</Text>
    </View>
    );
  }
}

const styles={
    title:{
        fontSize:14,fontWeight:'bold',color:'#303030'

    },
    publisher:{
        fontSize:12,fontWeight:'bold',color:'#999999',paddingTop: 4
    }
}
