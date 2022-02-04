import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

const Cell = ({ cell, showWords }) => {
const [cellInfo, setcellInfo] = useState(cell);

    if (cell.string === "+") {
        return (
            <View style={styles.empty}>
                <Text style={{ fontWeight: 'bold' }}></Text>
            </View>)
    }

    return (
        <View style={styles.container}>
            <Text onPress={() => showWords(cell)} style={{ fontWeight: 'bold' }}> {cell.show?  cell.string: ""}</Text>
        </View>
    )
}

export default Cell;


const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        width: 30,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    empty: {

        width: 30,
        height: 30,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },



});
