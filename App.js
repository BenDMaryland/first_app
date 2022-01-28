import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Board from './components/Board';
import Header from './components/Header';
import MainBody from './components/MainBody';
export default function App() {
  const [allWords, setallWords] = useState();

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/all")
      .then(r => r.json())
      .then(data => setallWords(data.sort(() => Math.random() - 0.5)))

  }, []);

  if (!allWords) return null

  console.log(allWords)


  return (
    <View style={styles.container}>
      <Header />
      <MainBody />
      <Board allWords={allWords} />

    </View>
  );
}

const head = StyleSheet.create({
  flex: 1,


})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
