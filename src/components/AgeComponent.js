import { useState, useEffect, useRef } from "react";
import "./componentCSS/ageComponent.css"


const AgeComponent = () => {
  const [ageValue, setAgeValue] = useState(0);
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(10);
  const timeout = useRef(undefined);
  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to =setTimeout(() => {
        setAgeValue(0);
        setAgeMin(0);
        setAgeMax(0);
      }, 3000)

      timeout.current= to;
    }
  
    function bindEvent(){
      window.addEventListener("CY_FACE_AGE_RESULT",handleAgeEvent);
    }
    
    function handleAgeEvent (evt) {
      resetTimeout();
      let age = Math.floor(evt.detail.output.numericAge) || 0
      setAgeValue(age);
      setAgeMin(Math.floor(age / 10) * 10)
      setAgeMax((Math.floor(age / 10) + 1) * 10);
    }
    bindEvent();
  }, []);

  

  return (
    <div>
      <p style={{fontSize:"20px"}}>Age Component:</p>
      <div>
        <span className="age" id="ageMin">{ageMin}</span>
        <input
        type="range"
        min="1"
        max="100"
        value={ageValue || 0}
        onChange={()=>{}}
        className="slider"
      />
        <span className="age" id="ageMax">{ageMax}</span>
      </div>
    <span id="title">Likely Age</span>
  </div>
  );
};

export default AgeComponent;
