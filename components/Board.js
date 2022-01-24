import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Board = ({ allWords }) => {
const [HorzArray, setHorzArray] = useState();
    const [VertArray, setVertArray] = useState();
    let word = ''
    let num = 0
    let crossArray = []
    let attempt = 0

    useEffect(() => {
        let Vertical = allWords.slice(attempt, attempt + 3)
        console.log(attempt)

        for (let letterPos = 0; letterPos < Vertical.length; letterPos++) {
            for (let i = 0; i < Vertical.length; i++) {

                let letter = Vertical[i][letterPos]
                word = word + letter
                num++
            }
            console.log("the chars are ", word)
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
        console.log(attempt)
        console.log('cross array is ', crossArray)
        console.log('reg array is', Vertical)
        setHorzArray(crossArray)
        setVertArray(Vertical)

    }, []);
    if (!VertArray) return null 

console.log(VertArray)
console.log(HorzArray)
//     function getBoard(attempt =0) {
// //         let Vertical = allWords.slice(attempt, attempt + 3)
// // console.log(attempt)

// //         for (let letterPos = 0; letterPos < Vertical.length; letterPos++) {
// //             for (let i = 0; i < Vertical.length; i++) {

// //                 let letter = Vertical[i][letterPos]
// //                 word = word + letter
// //                 num++
// //             }
// //             console.log("the chars are ", word)
// //             let crossWord = allWords.find(oneWord => oneWord.startsWith(word))

// //             if (crossWord === undefined) {
// //                 attempt = attempt + 3
// //                 Vertical = allWords.slice(attempt, attempt + 3)
// //                 word = ''
// //                 i = -1
// //                 letter = ''
// //                 num = -1
// //                 letterPos = -1
// //                 crossWord = ''
// //                 crossArray = []
              
// //             }
// //             else {
// //                 crossArray.push(crossWord)

// //                 word = ''
// //             }
// //         }
// //         console.log(attempt)
// //         console.log('cross array is ', crossArray)
// //         console.log('reg array is', Vertical)
// // setarray(crossArray)
//     }






    return (
        <View>

            <Text>fff</Text>
        </View>
    );
};

export default Board;
