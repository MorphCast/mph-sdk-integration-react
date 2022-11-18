import { useState, useEffect } from "react";


const GenderComponent = () => {
  const [gender, setGender] = useState("");
  
  useEffect(() => {
    bindEvents();
  }, []);

  function bindEvents(){
    window.addEventListener("CY_FACE_GENDER_RESULT", (evt) => {
      setGender(evt.detail.output.mostConfident || "") ;
    });
  }
  return (
    <>
    <p style={{fontSize:"20px"}}>Gender Component:</p>
    <div style={{minHeight: "200px"}}>
    <p>{gender}</p>
    {(gender.toLocaleLowerCase() === 'male') && <img alt="" src="male.png"/>}
    {(gender.toLocaleLowerCase() === 'female') && <img alt="" src="female.png"/>}
    </div>
    </>
    
  );
};

export default GenderComponent;
