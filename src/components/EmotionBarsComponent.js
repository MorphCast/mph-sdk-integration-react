import { useState, useEffect, useRef } from "react";
import "./componentCSS/emotionBarsComponent.css"
import SingleBarComponent from "./SingleBarComponent";


const EmotionBarsComponent = () => {
  const [angry, setAngry] = useState(0);
  const [disgust, setDisgust] = useState(0);
  const [fear, setFear] = useState(0);
  const [happy, setHappy] = useState(0);
  const [sad, setSad] = useState(0);
  const [surprise, setSurprise] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const timeout = useRef(undefined);
  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to =setTimeout(() => {
        setAngry(0);
        setDisgust(0);
        setFear(0);
        setHappy(0);
        setSad(0);
        setSurprise(0);
        setNeutral(0);
      }, 3000)

      timeout.current= to;
    }
  
    function bindEvent(){
      window.addEventListener("CY_FACE_EMOTION_RESULT",handleAgeEvent);
    }
    
    function handleAgeEvent (evt) {
        resetTimeout();
        setAngry(evt.detail.output.emotion.Angry * 100);
        setDisgust(evt.detail.output.emotion.Disgust * 100);
        setFear(evt.detail.output.emotion.Fear * 100);
        setHappy(evt.detail.output.emotion.Happy * 100);
        setSad(evt.detail.output.emotion.Sad * 100);
        setSurprise(evt.detail.output.emotion.Surprise * 100);
        setNeutral(evt.detail.output.emotion.Neutral * 100);
    }
    bindEvent();
  }, []);

  

  return (
    <>
        <p style={{fontSize:"20px"}}>EmotionBars Component:</p>
        <div id="emotionsContainer">
            <SingleBarComponent name="Angry" color1="#E21919" color2="#984E4E" value = {angry}></SingleBarComponent>
            <SingleBarComponent name="Disgust" color1="#37D042" color2="#1A6420" value = {disgust}></SingleBarComponent>
            <SingleBarComponent name="Fear" color1="#FF007A" color2="#906490" value = {fear}></SingleBarComponent>
            <SingleBarComponent name="Happy" color1="#FFEA00" color2="#8F8A57" value = {happy}></SingleBarComponent>
            <SingleBarComponent name="Sad" color1="#6CB4DF" color2="#4E8698" value = {sad}></SingleBarComponent>
            <SingleBarComponent name="Surprise" color1="#F5B9C3" color2="#664E98" value = {surprise}></SingleBarComponent>
            <SingleBarComponent name="Neutral" color1="#A9A9A9" color2="#737373" value = {neutral}></SingleBarComponent>
        </div>
    </>
   
  );
};

export default EmotionBarsComponent;
