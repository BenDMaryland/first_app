import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Cell from './Cell';
const Board = ({ allWords }) => {
    const [HorzArray, setHorzArray] = useState();
    const [LongestVertWords, setLongesVertWords] = useState(0);
    const [LongestHorzWordLength, setLongestHorzWordLength] = useState(0);
    const [VertArray, setVertArray] = useState();
    const [HorzDef, setHorzDef] = useState([]);
    const [VertDef, setVertDef] = useState([]);
    const [BoardState, setBoardState] = useState([]);
    const [TestState, setTestState] = useState();
    let word = ''
    let num = 0
    let crossArray = []
    let attempt = 0
    let boardSolution = []
    let cell = {
        x: "",
        y: '',
        string: "",
        show: true
    }

    /// Here we look for compatable cross words
    useEffect(() => {
        let Vertical = allWords.slice(attempt, attempt + 3)
        // console.log(attempt)
        for (let letterPos = 0; letterPos < Vertical.length; letterPos++) {
            for (let i = 0; i < Vertical.length; i++) {
                let letter = Vertical[i][letterPos]
                word = word + letter
                num++
            }
            // console.log("the chars are ", word)
            let crossWord = allWords.find(oneWord => oneWord.startsWith(word))
            /// If we don't find enough we reset the list
            if (crossWord === undefined) {
                attempt = attempt + 3
                Vertical = allWords.slice(attempt, attempt + 3)
                word = ''
                i = -1
                letter = ''
                num = -1
                letterPos = -1
                crossWord = ''
                crossArray = []

            }
            else {
                crossArray.push(crossWord)
                //
                word = ''
            }
        }
        // console.log(attempt)
        // console.log('cross array is ', crossArray)
        // console.log('reg array is', Vertical)
        setHorzArray(crossArray)
        setVertArray(Vertical)

    }, []);

    function showWords(e){
        console.log("____________________________________")
        console.log("board state is touched ", BoardState)
      setBoardState( BoardState.map( (words,index)=>   {
            if (index == e.y) return words.map(word => { return { ...word, show: false }} )
            else return words
        } ))
    
        //BoardState[i].map(word => {  return {  ...word,   show: false  } 


    }

    /// Here we grab the definition for words
    useEffect(() => {
        async function grabData() {
            if (HorzArray) {
                let array = []
                if (HorzDef.length === 0) {
                    for (let i = 0; i < HorzArray.length; i++) {
                        const data = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${HorzArray[i]}?key=03aa2c96-7380-4041-afb8-fd2d579f195c`)
                        const json = await data.json();
                        array.push(json)   
                        if (array.length == 3) { setHorzDef(array) }
                    }

                }
            }
        }
        grabData()
    }, [HorzArray, VertArray]);

    useEffect(() => {
        async function grabData() {
            if (VertArray) {
                let array = []
                if (VertDef.length === 0) {
                    for (let i = 0; i < VertArray.length; i++) {
                        const data = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${VertArray[i]}?key=03aa2c96-7380-4041-afb8-fd2d579f195c`)
                        const json = await data.json();
                        array.push(json)
                        console.log("Alright array is ", array)

                        if (array.length == 3) { setVertDef(array) }
                    }

                }
            }
        }
        grabData()
    }, [HorzArray, VertArray]);

    useEffect(() => {
        console.log("Vert def is ", VertDef)
        console.log("Horx def is ", HorzDef)
    }, [HorzDef]);




    useEffect(() => {
        if (!VertArray) return null
    for (let i = 0; i < HorzArray.length; i++) {
        VertArray[i].length > LongestVertWords ? setLongesVertWords(VertArray[i].length) : null
        HorzArray[i].length > LongestHorzWordLength ? setLongestHorzWordLength(HorzArray[i].length) : null


    }

    }, [VertArray]);


    // console.log(VertArray)
    // console.log(HorzArray)
    // console.log('horz', LongestHorzWordLength)
    // console.log("vert", LongestVertWords)


    useEffect(() => {
        if (!VertArray) return null
    for (let i = 0; i < HorzArray.length; i++) {
        let array = HorzArray[i].split('')

        boardSolution.push(array.map((str, index) => cell = { y: i, x: index, string: str, show:true }))
       
    }

    for (let i = 3; i < LongestVertWords; i++) {

        let str1 = VertArray[0][i] ? VertArray[0][i] : "+"
        let str2 = VertArray[1][i] ? VertArray[1][i] : "+"
        let str3 = VertArray[2][i] ? VertArray[2][i] : "+"
        let str = str1 + str2 + str3
        let arr = str.split('')
        boardSolution.push(arr.map((str, index) => cell = { y: i, x: index, string: str, show: true  }))
setBoardState(boardSolution)

    }}
, [HorzArray, VertArray, VertDef])

if(!VertArray) return null
    if (!VertDef) return null
    return (

        <ScrollView >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap'} } >
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold' }}>0</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold' }}>1</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold' }}>2</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ fontWeight: 'bold' }}>3</Text>
                </View>
            </View>
            {BoardState.map((array, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <View style={styles.container}>
                            <Text style={{ fontWeight: 'bold' }}>{   index< 3? index +1:""}  </Text>
                        </View>


                        {array.map((cell, index) => {
                            if (cell == undefined) return null

                            return (
                                <Cell key={index} cell={cell} showWords={showWords} />
                            )
                        })

                        }
                        <Text style={{ alignSelf: 'flex-end' }}></Text>
                    </View>


                )
            }

            )}
            <Text>Horizontal  one is {HorzArray[0]}</Text>
            <Text>Horizontal two is {HorzArray[1]}</Text>
            <Text>Horizontal three is {HorzArray[2]}</Text>
            <Text></Text>
            <Text>Vertical one is {VertArray[0]}</Text>
            <Text>Vertical two is {VertArray[1]}</Text>
            <Text>Vertical three is {VertArray[2]}</Text>
            <Text></Text>
            {HorzDef.length == 3 ? HorzDef[0].length != 20 ? <Text>Horx def is 1:{HorzDef[0][0].shortdef[0]}</Text> : null : null}
            <Text></Text>
            {HorzDef.length == 3 ? HorzDef[1].length != 20 ? <Text>Horx def is 2: {HorzDef[1][0].shortdef[0]}</Text> : null : null}
            <Text></Text>
            {HorzDef.length == 3 ? HorzDef[2].length != 20 ? <Text>Horx def is 3; {HorzDef[2][0].shortdef[0]}</Text> : null : null}
            <Text></Text>

            {VertDef.length == 3 ? VertDef[0].length != 20 ? <Text>VertDef def is 1:{VertDef[0][0].shortdef[0]}</Text> : null : null}
            <Text></Text>
            {VertDef.length == 3 ? VertDef[1].length != 20 ? <Text>VertDef def is 2: {VertDef[1][0].shortdef[0]}</Text> : null : null}
            <Text></Text>
            {VertDef.length == 3 ? VertDef[2].length != 20 ? <Text>VertDef def is 3; {VertDef[2][0].shortdef[0]}</Text> : null : null}
            <Text></Text>
        </ScrollView>


    );
};

export default Board;



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
