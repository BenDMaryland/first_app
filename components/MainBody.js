import { Text, View, TextInput ,Image, Button} from 'react-native';
import React, { Component, useState } from 'react';


const   MainBody =()=>{

      const [name, setName] = useState(" ");
  const [lyric, setLyric] = useState(" ");

function voicegrab(e){

}

    return (
      <View>

        {/* <Text>Main Body goes Here</Text>
        <Button onPress={e=>voicegrab(e)} title='Click Here'></Button>
        <Text>{name}, name</Text>
            <TextInput 
                placeholder="Type here to translate!"
            onChangeText={text => setName(text)} /> */}
            {/* <Image source={{
                width: 200,
                height: 300,
                uri: "https://picsum.photos/200/300"
            }} /> */}
      </View>
    );
  }


export default MainBody;
