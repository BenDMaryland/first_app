import { Text, View, TextInput ,Image} from 'react-native';
import React, { Component, useState } from 'react';


const   MainBody =()=>{

      const [name, setName] = useState(" ");
    return (
      <View>

        <Text>Main Body goes Here</Text>
        <Text>{name}, name</Text>
            <TextInput 
                placeholder="Type here to translate!"
            onChangeText={text => setName(text)} />
            <Image source={{
                width: 200,
                height: 300,
                uri: "https://picsum.photos/200/300"
            }} />
      </View>
    );
  }


export default MainBody;
