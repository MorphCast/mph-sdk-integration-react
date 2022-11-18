import { useEffect, useRef } from "react";
import { useExternalScript } from "./helpers/ai-sdk/externalScriptsLoader";
import { getAiSdkControls } from "./helpers/ai-sdk/loader";

import './App.css';

import GenderComponent from "./components/GenderComponent";
import AgeComponent from "./components/AgeComponent";
import DominantEmotionComponent from "./components/DominantEmotionComponent";
import FeatureComponent from "./components/FeatureComponent";
import EngagementComponent from "./components/EngagementComponent";
import FaceTrackerComponent from "./components/FaceTrackerComponent";
import MoodComponent from "./components/MoodComponent";
import EmotionBarsComponent from "./components/EmotionBarsComponent";

function App() {

  const mphToolsState = useExternalScript("https://sdk.morphcast.com/mphtools/v1.0/mphtools.js");
  const aiSdkState = useExternalScript("https://ai-sdk.morphcast.com/v1.16/ai-sdk.js");
  const videoEl = useRef(undefined)

  useEffect(() => {
    videoEl.current = document.getElementById("videoEl");
    async function getAiSdk (){
      if(aiSdkState === "ready" && mphToolsState === "ready"){
        const { source, start } = await getAiSdkControls();
      await source.useCamera({
        toVideoElement: document.getElementById("videoEl"),
      });
        await start();
        
      }
     
    }
    getAiSdk();
  }, [aiSdkState, mphToolsState]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
          <div style={{width:"640px", height: "480px", position:"relative"}}>
            <video id="videoEl"></video>
            <FaceTrackerComponent videoEl={videoEl}></FaceTrackerComponent>
          </div>
          <GenderComponent></GenderComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <DominantEmotionComponent></DominantEmotionComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <AgeComponent></AgeComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <FeatureComponent></FeatureComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <EngagementComponent></EngagementComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <MoodComponent></MoodComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          <EmotionBarsComponent></EmotionBarsComponent>
          <hr className="solid" style={{width:"100%"}}></hr>
          
        </div>
      </header>
    </div>
  );
}

export default App;
