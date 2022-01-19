import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import Header from './components/Header';
import MainBody from './components/MainBody';
export default function App() {
  return (
    <View style={styles.container}>
        <Header />
      <MainBody />
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
