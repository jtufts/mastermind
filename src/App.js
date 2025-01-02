import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const guessMax = 10;
  const codeLength = 4;
  const maxDigit = 6;
  const [currentGuesses, setCurrentGuesses] = useState(0);
  const [allGuesses, setAllGuesses] = useState([]);
  const [allResponses, setAllResponses] = useState([])
  const [correctCode, setCorrectCode] = useState("");
  const [nextGuess, setNextGuess] =  useState("");
  const [win, setWin] = useState(false);

  useEffect(() => {
    let generatedCode = "";
    for(let i = 0; i < codeLength; i++) {
      generatedCode = generatedCode.concat(Math.ceil(Math.random() * maxDigit));
    }
    setCorrectCode(generatedCode);
  }, [])

  function processGuess(guess) {
    const myGuesses = allGuesses;
    myGuesses.push(guess);
    setAllGuesses(myGuesses);
    console.log(correctCode);
    let plusses = "";
    let minuses = "";
     for(let i = 1; i <= maxDigit; i++){
      let exactDigits = 0;
      for(let j = 0; j < codeLength; j++){
        if(correctCode.charAt(j) == i && guess.charAt(j) == i ){
          exactDigits++;
        }
      }
      for(let j = 0; j < exactDigits; j++){
        plusses = plusses.concat("+")
      }
      for(let j = 0; j < Math.min(correctCode.split(i).length, guess.split(i).length) - 1 - exactDigits; j++){
        minuses = minuses.concat("-");
      }
     }
     const response = plusses + minuses;
     if(response ==="++++"){
      setWin(true);
     }
     const myResponses = allResponses;
     myResponses.push(response);
     setAllResponses(myResponses);
     setCurrentGuesses(currentGuesses + 1);
     console.log(allGuesses);
     console.log(allResponses);
  }

  return (
    <div>
      <div>Welcome to Jacob Tufts' Simplified Mastermind!</div>
      <div>You have used {currentGuesses} guesses</div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <table>
            {allGuesses.map((guess) => {
              return <tr><td style={{width: '100px', height: '25px', border: '1px solid black'}}>{guess}</td></tr>
            })}
        </table>
        <table>
          <tr>
            {allResponses.map((response) => {
              return <tr><td style={{width: '100px', height: '25px', border: '1px solid black'}}>{response}</td></tr>
            })}
          </tr>
        </table>
      </div>
      {win ? <div>You win! The correct code was {correctCode}</div> : currentGuesses < guessMax ? <div>
        <div>Enter your next guess here: </div>
        <input type='text' onChange={(e) => setNextGuess(e.target.value)} />
        <button onClick={() => processGuess(nextGuess)}>Submit Guess</button>
        </div> : <div>Game Over... the correct code was {correctCode}</div>
      }
    </div>
  );
}
