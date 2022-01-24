import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Board = ({ allWords }) => {
    const [HorzArray, setHorzArray] = useState();
    const [LongestVertWords, setLongesVertWords] = useState(0);
    const [LongestHorzWordLength, setLongestHorzWordLength] = useState(0);
    const [VertArray, setVertArray] = useState();
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


    if (!VertArray) return null

    for (let i = 0; i < HorzArray.length; i++) {
        console.log("dddd")
        VertArray[i].length > LongestVertWords ? setLongesVertWords(VertArray[i].length) : null
        HorzArray[i].length > LongestHorzWordLength ? setLongestHorzWordLength(HorzArray[i].length) : null
    }


    console.log(VertArray)
    console.log(HorzArray)
    console.log('horz', LongestHorzWordLength)
    console.log("vert", LongestVertWords)


    for (let i = 0; i < HorzArray.length; i++) {
        let array = HorzArray[i].split('')
        console.log(array)
        boardSolution.push(array.map((str, index) => cell = { y: i, x: index, string: str }))

        console.log('solution is ', boardSolution)
        console.log('current cell is ', cell)
    }


    return (
        <View>

            <Text>fff</Text>
        </View>
    );
};

export default Board;
