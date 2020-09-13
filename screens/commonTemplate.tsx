import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button,TouchableOpacity, AsyncStorage } from 'react-native';

export default function CommonTemplate({navigation,route,fontSize}) {
 const {data}=route.params
 const [fontSizeLocal, setFontSize] = useState(fontSize);
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,

  },
  buttonContainer:{
flexDirection:'row',
justifyContent:'flex-end',
  },
  buttonText:{
    padding:10,
    margin:5,
    backgroundColor: 'rgb(255,224,101)',
      },
  text:{
    fontSize:fontSizeLocal,
color: 'rgb(24,28,63)'

  }
});

const updateFontSize=async (newSize: number)=>{
  await AsyncStorage.setItem('fontSize',newSize.toString());
  setFontSize(newSize)
}


  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonText} onPress={() => updateFontSize(fontSizeLocal+3)} >
        <Text> + </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonText} onPress={() => ((fontSizeLocal>3)? updateFontSize(fontSizeLocal-3) : <></>)}>
        <Text> - </Text>
      </TouchableOpacity>
      </View>
     <ScrollView >
       <Text style={styles.text}>{data.body}</Text>
       </ScrollView>
    </View>
  );
  
  
}

   