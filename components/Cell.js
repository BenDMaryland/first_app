import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

const Cell = (props) => {

    if (!props.props) return null
        console.log("____________________________")
console.log("props props is ", props.props)
        console.log("String is ", props.props.string)
    console.log("____________________________")

    return (
        <View  key={Math.random} style={styles.container}>
            <Text>{props.props.string}</Text>
        </View>
    )
}

export default Cell;


const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        width: 30,
        height: 30,
        borderBottomWidth: 3,
    flexDirection: 'row'
    },
});
