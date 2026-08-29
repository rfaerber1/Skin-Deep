// Third React Component, matching game focusing on skin color and disease

import React from 'react';
import "../public/css/MatchingGame-wideScreen.css";
import "../public/css/MatchingGame-smallScreen.css";
import { useState } from "react";

const imgFolder = "../imgs/matching_game_imgs/";

let card1 = null;
let card2 = null;
let selected = 0;
let matches = 0;
let depiction = "";

// card used for matching game
function Card({value, borderColor, onCardClick}){
  if (borderColor == null){
    borderColor = 'black';
  }

  return (
    <button 
      className="card" 
      style={{
        backgroundImage: `url(${value})`,
        border: `7.5px solid ${borderColor}`
      }}
      onClick={onCardClick}
    >
    </button>
  );
}

export default function MatchingGame() {
  const [display, setDisplay] = useState(
    {
      start: "block",
      game: "none",
      playAgain: "none"
    }
  );


  // setup cards and their matches
  
  let cards1 = useState(Array().fill([]));
  let cards2 = useState(Array().fill([]));

  cards1[0] = {
    src : imgFolder + "psoriasis-dark.jpg",
    key: 0,
    depiction: "psoriasis"
  };
  cards2[0] = {
    src : imgFolder + "psoriasis-light.jpg",
    key: 0,
    depiction: "psoriasis"
  };

  cards1[1] = {
    src : imgFolder + "bullseye-dark.jpg",
    key: 1,
    depiction: "bullseye rash"
  };
  cards2[1] = {
    src : imgFolder + "bullseye-light.jpg",
    key: 1,
    depiction: "bullseye rash"
  };

  cards1[2] = {
    src : imgFolder + "bedBugBite-dark.jpg",
    key: 2,
    depiction: "bed bug bites"
  };
  cards2[2] = {
    src : imgFolder + "bedBugBite-light.jpg",
    key: 2,
    depiction: "bed bug bites"
  };

  cards1[3] = {
    src : imgFolder + "measles-dark.jpg",
    key: 3,
    depiction: "measles"
  };
  cards2[3] = {
    src : imgFolder + "measles-light.jpg",
    key: 3,
    depiction: "measles"
  };

  cards1[4] = {
    src : imgFolder + "eczema-dark.jpg",
    key: 4,
    depiction: "eczema"
  };
  cards2[4] = {
    src : imgFolder + "eczema-light.jpg",
    key: 4,
    depiction: "eczema"
  };

  cards1[5] = {
    src : imgFolder + "melanoma-dark.jpg",
    key: 5,
    depiction: "melanoma"
  };
  cards2[5] = {
    src : imgFolder + "melanoma-light.jpg",
    key: 5,
    depiction: "melanoma"
  };

  cards1[6] = {
    src : imgFolder + "tineaVersicolor-dark.jpg",
    key: 6,
    depiction: "tinea versicolor"
  };
  cards2[6] = {
    src : imgFolder + "tineaVersicolor-light.jpg",
    key: 6,
    depiction: "tinea versicolor"
  };

  
  // setup physical placement of cards
  
  let [playerCards, setUpPlayerCards] = useState(Array(8).fill({}));
  let pairs = [0,1,2,3,4,5,6]

  function resetCards(){
    const nextCards = playerCards.slice();
    let cards = [0,1,2,3,4,5,6,7];
    let card = cards1[0];

    let pair = 0;

    matches = 0;
    depiction = null;

    const newDisplay = display;
    newDisplay.playAgain="none";
    setDisplay(newDisplay);

    for(let i = 0; i < 8; i++){
      if (i % 2 == 0){
        pair = Math.round(Math.random()*(pairs.length-1));
        card = cards1[pairs[pair]];
      }
      else {
        card = cards2[pairs[pair]];
        pairs.splice(pair, 1);
      }

      let n = Math.round(Math.random()*(cards.length-1));    
      nextCards[cards[n]] = {
        src: card.src,
        key: card.key,
        border: 'black',
        depiction: card.depiction
      };
      cards.splice(n, 1);
    }
    setUpPlayerCards(nextCards);
  }

  // handle user interaction
  function handleCardClick(cardNum){
    const nextCards = playerCards.slice();

    // set up what border colors mean
    let cardSelectedColor = "green";
    let cardNotSelectedColor = "black";
    
    let matchSelectedColor = "coral";
    let matchNotSelectedColor = "gray";

    // set up user interaction based on cards clicked
    if(playerCards[cardNum].border == matchNotSelectedColor) {
      selected = 0;
      //unselect a matched pair when new match is selected
      if (card1 != null){
        if (nextCards[card1.num].border == matchSelectedColor || nextCards[card1.num].border == matchNotSelectedColor){
          nextCards[card1.num].border = matchNotSelectedColor;
          nextCards[card2.num].border = matchNotSelectedColor;
        }
        else {
          nextCards[card1.num].border = cardNotSelectedColor;
        }
      }
      
      depiction = playerCards[cardNum].depiction;

      // select a matched pair
      card1 = {
        key: playerCards[cardNum].key,
        num: cardNum
      };
      for (let i = 0; i < 8; i++){
        if (i != cardNum){
          if (playerCards[i].depiction == depiction){
            nextCards[i].border = matchSelectedColor;
            card2 = {
              key: playerCards[i].key,
              num: i
            };
            break;
          }
        }
      }

      nextCards[card1.num].border = matchSelectedColor;
      
      setUpPlayerCards(nextCards);
      
    }
    // unselect a selected match
    else if (playerCards[cardNum].border == matchSelectedColor){
      nextCards[card1.num].border = matchNotSelectedColor;
      nextCards[card2.num].border = matchNotSelectedColor;
      depiction = null;
      selected = 0;
      setUpPlayerCards(nextCards);
    }
    // selecting first card
    else if(selected == 0){
      // unselect selected match if previously selected
      if (card1 != null){
        if (nextCards[card1.num].border == matchSelectedColor){
          nextCards[card1.num].border = matchNotSelectedColor;
          nextCards[card2.num].border = matchNotSelectedColor;
        }
      }

      // set up selected card
      depiction = null;
      nextCards[cardNum].border = cardSelectedColor;
      setUpPlayerCards(nextCards);
      
      card1 = {
        key: playerCards[cardNum].key,
        num: cardNum
      };
      selected ++;
    }
    // selecting second card
    else if(selected == 1){
      // same card reselected
      if (card1.num == cardNum){
        nextCards[cardNum].border = cardNotSelectedColor;
        selected = 0;
        setUpPlayerCards(nextCards);
        return;
      }
      // new card is selected
      else {
        depiction = null;
        nextCards[cardNum].border = cardSelectedColor;
        setUpPlayerCards(nextCards);

        card2 = {
          key: playerCards[cardNum].key,
          num: cardNum
        };
        
        setTimeout (() => {
          checkMatch();
        }, 1000);
      }
    }

    // check if two cards are a match
    function checkMatch(){
      const nextCards = playerCards.slice();
      if (card1.key == card2.key){
        //console.log("match!");
        nextCards[card1.num].border = matchSelectedColor;
        nextCards[card2.num].border = matchSelectedColor;

        depiction = playerCards[cardNum].depiction;

        matches ++;
      }
      else {
        //console.log("not a match");
        nextCards[card1.num].border = cardNotSelectedColor;
        nextCards[card2.num].border = cardNotSelectedColor;
      }
      setUpPlayerCards(nextCards);
      selected = 0;

      // all matches found
      if (matches == 4){
        const newDisplay = display;
        newDisplay.playAgain="block";
        setDisplay(newDisplay);
      }
    }
  }

  // function to begin game
  function startGame(){
    const newDisplay = display;
    newDisplay.start = "none";
    resetCards();
    newDisplay.game = "flex";
    setDisplay(newDisplay);
  }

  // function to go back to start screen
  function backToStart() {
    const newDisplay = display;
    newDisplay.start = "block";
    newDisplay.game = "none";
    newDisplay.playAgain = "none";
    
    setDisplay(newDisplay);
    resetCards();
  }
  
  return (
    <main id="main-MatchingGame">
      <h2>Matching Game</h2>
      <div id="startScreen" style={{display: display.start}}>
        <p>See how similar/different some skin conditions can look given different skin tones. Find matches consisting of two cards showing the same condition but on different skin tones.</p>
        <p style={{textAlign: 'center', textIndent: '0px'}}>(Note: does not contain any graphic images)</p>
        <button onClick={() => startGame()}>
          Start
        </button>
      </div>
      <div id="game" style={{display: display.game}}>
        <div className="cardRow">
          <Card 
            value={playerCards[0].src} 
            borderColor={playerCards[0].border} 
            onCardClick={() => handleCardClick(0)}>
          </Card>
          <Card 
            value={playerCards[1].src} 
            borderColor={playerCards[1].border} 
            onCardClick={() => handleCardClick(1)}>
          </Card>
          <Card 
            value={playerCards[2].src} 
            borderColor={playerCards[2].border} 
            onCardClick={() => handleCardClick(2)}>
          </Card>
          <Card 
            value={playerCards[3].src} 
            borderColor={playerCards[3].border} 
            onCardClick={() => handleCardClick(3)}>
          </Card>
        </div>
        <div className="cardRow">
          <Card 
            value={playerCards[4].src} 
            borderColor={playerCards[4].border} 
            onCardClick={() => handleCardClick(4)}>
          </Card>
          <Card 
            value={playerCards[5].src} 
            borderColor={playerCards[5].border} 
            onCardClick={() => handleCardClick(5)}>
          </Card>
          <Card 
            value={playerCards[6].src} 
            borderColor={playerCards[6].border} 
            onCardClick={() => handleCardClick(6)}>
          </Card>
          <Card 
            value={playerCards[7].src} 
            borderColor={playerCards[7].border} 
            onCardClick={() => handleCardClick(7)}>
          </Card>
        </div>
      </div>
      <div id="matchingGame-footer">
        <div>
          <p style={{display: display.game}}>
            Match Depicts: {depiction}</p>
        </div>
        <div>
          <button 
            style={{display: display.game}} 
            onClick={() => backToStart()}>
            Back
          </button>
        </div>
        <div>
          <p style={{display: display.playAgain}}>
            Great Job!</p>
          <button 
            id="matchingGame-playAgain" 
            onClick={() => resetCards()}
            style={{display: display.playAgain}} >
              Play Again
          </button>
        </div>
        
      </div>
    </main>
  );
}