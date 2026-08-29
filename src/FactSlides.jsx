// First React Component, slides with facts and info pertaining to dermatology

import "../public/css/FactSlides-wideScreen.css";
import "../public/css/FactSlides-smallScreen.css";
import { useState } from "react";

// numeric statistic
function Stat({ value }) {
  return <h1>{value}</h1>;
}

// text to go under statistic
function StatSubtitle({ value }) {
  return <p>{value}</p>;
}

// information to accompany statistic
function StatInformation({ value }) {
  return <h3>{value}</h3>;
}

export default function FactSlides() {
  let waitTime = 15;
  const [resetTime, setResetTime] = useState(false);
  const [x, setX] = useState(waitTime);

  // function to automatically advance slides
  let timer = setTimeout(function () {
    if (resetTime == true){
      setX(waitTime);
      setResetTime(false);
    }
    else if (x > 0) {
      setX(x - 1);
    }
    else {
      leftMove();
    }
  }, 1000);
  
  const [currentStat, setCurrentStat] = useState(0);
  const [nextStat, setNextStat] = useState(1);

  let stats = useState(Array().fill([]));
  let subtitles = useState(Array().fill([]));
  let details = useState(Array().fill([]));
  let diagrams = useState(Array().fill([]));

  let [displayDiagram, setDisplayDiagram] = useState('block');

  // information for each statistic
  
  stats[0] = "47%";
  subtitles[0] = "of dermatologists report...";
  details[0] = "47% of dermatologists report inadequate training on conditions concerning darker skin tones. \n\nThis can result in delayed diagnosis and treatment, resulting in higher mortality rates for some diseases.";
  diagrams[0] = "../imgs/fact_slide_imgs/melanoma_chart2.png";

  stats[1] = "71%";
  subtitles[1] =  "5-year melanoma survival rate for black people";
  details[1] =  "People of color are less likely to develop skin cancer. When it does occur it's diagnosed at later stages that are harder to treat. \n\nThis lowers the survival rate compared to the 94% survival rate for white people.";
  diagrams[1] = "../imgs/fact_slide_imgs/melanoma_chart3.png";

  stats[2] = "3%";
  subtitles[2] =  "of dermatologists identify as black";
  details[2] =  "When dermatologists share a cultural background with their patients they can provide better care.\n\nCurrent Dermatologist Demographics by race in the US:";
  diagrams[2] = "../imgs/fact_slide_imgs/dermatologist_race2.png";


  let statNum = 3;

  // function to go to previous statistic
  function rightMove() {
    setResetTime(true);

    let newCurrentStat = 0;
    let newNextStat = 0;
    
    if (currentStat < statNum - 1) {
      newCurrentStat = currentStat + 1;
      if (nextStat + 1 >= statNum) {
        newNextStat = 0;
      } else {
        newNextStat = nextStat + 1;
      }
    } else {
      newCurrentStat = 0;
      newNextStat = nextStat + 1;
    }
    
    if(diagrams[newNextStat] != null){
      setDisplayDiagram("block");
    }
    else {
      setDisplayDiagram("none");
    }

    setNextStat(newNextStat);
    setCurrentStat(newCurrentStat);
  }

  // function to go back to next statistic
  function leftMove() {
    setResetTime(true);
    
    let newCurrentStat = 0;
    let newNextStat = 0;
    
    if (currentStat == 0) {
      newCurrentStat = statNum - 1;
      newNextStat = nextStat -1;
    } else {
      newCurrentStat = currentStat - 1;
      if (nextStat == 0) {
        newNextStat = statNum - 1;
      } else {
        newNextStat = nextStat - 1;
      }
    }

    if(diagrams[newNextStat] != null){
      setDisplayDiagram("block");
    }
    else {
      setDisplayDiagram("none");
    }

    setNextStat(newNextStat);
    setCurrentStat(newCurrentStat);
  }

  return (
    <main id="main-FactSlides">
      <div id="infoSection1">
        <button onClick={() => rightMove()}>&lt;</button>
        <div className="fact" id="fact2">
          <Stat value={stats[currentStat]}></Stat>
          <StatSubtitle value={subtitles[currentStat]}></StatSubtitle>
        </div>
        <div className="fact" id="fact1">
          <Stat value={stats[nextStat]}></Stat>
          <StatSubtitle value={subtitles[nextStat]}></StatSubtitle>
        </div>
        <button onClick={() => leftMove()}>&gt;</button>
      </div>
      <div id="infoSection2">
        <div id="factInfo">
          <StatInformation value={details[nextStat]}></StatInformation>
          <img src={diagrams[nextStat]} style={{display:displayDiagram}}></img>
        </div>
      </div>
    </main>
  );
}
