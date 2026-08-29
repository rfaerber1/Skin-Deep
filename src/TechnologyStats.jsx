// Second React Component, drop downs featuring information on current efforts in dermatology

import React from 'react';
import "../public/css/TechnologyStats-wideScreen.css";
import "../public/css/TechnologyStats-smallScreen.css";
import { useState } from "react";

// each drop down and its information
function Stat({value, state, onStatClick, statInfo}){

  return (
    <div className='technologyStat'>
      <button onClick={onStatClick}>{value}</button>
      <div style={{display:state}}>
        {statInfo}
      </div>
    </div>
  );
}

export default function TechnologyStats() {
  let statsNum = 4;
  const [display, setDisplay] = useState(Array(statsNum).fill("none"));
  const [statInfo] = useState(Array().fill([]));

  // information for each drop down
  
  statInfo[0] = 
    <section>
      <ul>
        <p>On January 17, 2024 the FDA approved DermaSensor, a handheld AI powered device used to detect skin cancer with a 96% sensitivity rate for detecting skin cancer on all skin types.</p>
        <p>Using light pulses, DermaSensor analyzes skin tissue to detect skin cancer.</p>
        <p>DermaSensor allows physicians to quickly and accurately assess skin lesions for cancer. Allowing patients faster diagnosis with quicker turn around times to get treatment.</p> 
      </ul>
      <img src="../imgs/tech_stat_imgs/dermasensor.png"></img>
    </section>;
  
  statInfo[1] = 
    <section>
      <ul>
        <p>Google Health and Stanford Medicine collaborated to make a The Skin Condition Image Network (SCIN) dataset, which they published in March 2024.</p>
        <p>The SCIN dataset is a free open-access resource for representative dermatology images.</p>
        <p>Presenting data for bridging important gaps in AI development, medical research, and equitable healthcare tools in dermatology.</p>
      </ul>
      <img src="../imgs/tech_stat_imgs/scin.png"></img>
    </section>;
  
  statInfo[2] = 
    <section>
    <ul>
      <p>Students at Stanford published this paper in August 2023. Their study used machine learning to analyze skin tone representation in educational materials.</p>
      <p>They used machine learning to detect human bias; finding that one in ten photos were on the black-brown range using the Fitzpatrick Scale. </p>
      <p>The goal for STAR-ED is to help educators, publishers, and clinicians to assess their educational materials for skin-tone bias.</p>
    </ul>
      <img src="../imgs/tech_stat_imgs/star-ed3.jpg"></img>
    </section>;

  statInfo[3] =
    <section>
    <ul>
      <p>The BBD (Black Derm Directory) was created by Board Certified Dermatologist Dr. Achiamah Osei-Tutu.</p>
      <p>It was the result of countless requests of people from African descent seeking support and help for their dermatologic issues from dermatologists with similar backgrounds.</p>
      <p>The directory allows people to search for black dermatologists based on specialty and location.</p>
    </ul>
    <img src="../imgs/tech_stat_imgs/bbd3.png"></img>
    </section>;

  // function to handle user interaction
  function handleStatClick(index){
    let newDisplay = display;

    // display fact and hide previous selection (if any)
    if (newDisplay[index] == "none"){
      newDisplay = Array(statsNum).fill("none");
      newDisplay[index] = "block";
      setDisplay(newDisplay);
    }
    // hide selected fact
    else {
      newDisplay = Array(statsNum).fill("none");
      setDisplay(newDisplay);
    }
  }

  return (
    <main id="technology">
      <div className="text">
      
      <h3>Many organizations have developed and are working on projects to improve the field of dermatology and its equity</h3>

      <h2>Products</h2>
      <Stat 
        value="DermaSensor" 
        state={display[0]}
        onStatClick={() => handleStatClick(0)}
        statInfo = {statInfo[0]}
      />
        
      <h2>Research</h2>
      <Stat 
        value="Skin Condition Image Network (SCIN) dataset" 
        state={display[1]}
        onStatClick={() => handleStatClick(1)}
        statInfo = {statInfo[1]}
      />
      <Stat 
        value="Skin Tone Analysis for Representation in Educational Materials (STAR-ED) using machine learning" 
        state={display[2]}
        onStatClick={() => handleStatClick(2)}
        statInfo = {statInfo[2]}
      />

      <h2>Organizations</h2>
      <Stat 
        value="Black Derm Directory" 
        state={display[3]}
        onStatClick={() => handleStatClick(3)}
        statInfo = {statInfo[3]}
      />
      </div>
      
    </main>
  );
}