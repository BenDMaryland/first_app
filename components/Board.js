import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Cell from './Cell';
const Board = ({ allWords }) => {
    const [HorzArray, setHorzArray] = useState();
    const [LongestVertWords, setLongesVertWords] = useState(0);
    const [LongestHorzWordLength, setLongestHorzWordLength] = useState(0);
    const [VertArray, setVertArray] = useState();
    const [HorzDef, setHorzDef] = useState([]);
    const [BoardState, setBoardState] = useState([]);
    let word = ''
    let num = 0
    let crossArray = []
    let attempt = 0
    let boardSolution = []
    let cell = {
        x: "",
        y: '',
        string: ""

    }
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

                word = ''
            }
        }
        // console.log(attempt)
        // console.log('cross array is ', crossArray)
        // console.log('reg array is', Vertical)
        setHorzArray(crossArray)
        setVertArray(Vertical)

    }, []);


    useEffect(() => {
        if (HorzArray) {
            let array = []
            for (let i = 0; i < HorzArray.length; i++) {
                fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${HorzArray[i]}?key=03aa2c96-7380-4041-afb8-fd2d579f195c`)
                    .then(r => r.json())
                    .then(data => array.push(data))
                    .catch(error => console.log("Hi ", error))
                    console.log("array is", array)
                    console.log(HorzDef)
                    console.log(array.length)
                 if (array.length ==3){ setHorzDef(array)}
                 

            }
        }
    }, [HorzArray,VertArray]);



    if (!VertArray) return null


    for (let i = 0; i < HorzArray.length; i++) {
        VertArray[i].length > LongestVertWords ? setLongesVertWords(VertArray[i].length) : null
        HorzArray[i].length > LongestHorzWordLength ? setLongestHorzWordLength(HorzArray[i].length) : null


    }


    // console.log(VertArray)
    // console.log(HorzArray)
    // console.log('horz', LongestHorzWordLength)
    // console.log("vert", LongestVertWords)




    for (let i = 0; i < HorzArray.length; i++) {
        let array = HorzArray[i].split('')

        boardSolution.push(array.map((str, index) => cell = { y: i, x: index, string: str }))

    }

    for (let i = 3; i < LongestVertWords; i++) {

        let str1 = VertArray[0][i] ? VertArray[0][i] : "+"
        let str2 = VertArray[1][i] ? VertArray[1][i] : "+"
        let str3 = VertArray[2][i] ? VertArray[2][i] : "+"
        let str = str1 + str2 + str3


        let arr = str.split('')
        boardSolution.push(arr.map((str, index) => cell = { y: i, x: index, string: str }))

    }


    console.log("the def is", HorzDef)
    
    
    return (

        <View >
            {boardSolution.map((array, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {array.map((cell, index) => {
                            if (cell == undefined) return null

                            return (
                                <Cell key={index} props={cell} />
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

            <Text>Vertical one is {VertArray[0]}</Text>
            <Text>Vertical two is {VertArray[1]}</Text>
            <Text>Vertical three is {VertArray[2]}</Text>
          {HorzDef.length ==3?   <Text>Horx def is 1{HorzDef[0].shortdef}</Text> : null}


        </View>


    );
};

export default Board;

