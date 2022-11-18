import { useState, useEffect } from "react";


const GenderComponent = () => {
  const [dominantEmotion, setDominantEmotion] = useState("");
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_EMOTION_RESULT", (evt) => {
      setDominantEmotion(evt.detail.output.dominantEmotion || "") ;
    });
  }
  return (
    <div >
    <p style={{fontSize:"20px"}}>DominantEmotion Component:</p>
     <p>{dominantEmotion}</p>
    </div>
  );
};

export default GenderComponent;
