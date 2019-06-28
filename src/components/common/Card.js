import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <View style={styles.container}>{this.props.children}</View>
    
  }
}

const styles={
container:{
    margin:20,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#ddd',
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.3,
    shadowRadius:2,
    elevation:1

}
}
