import { useEffect, useRef } from "react";
import "./componentCSS/faceTrackerComponent.css"


const FaceTrackerComponent = (props) => {
  const timeout = useRef(undefined);
  const faceTracker= useRef(undefined);
  const sdk_w = useRef(undefined);
  const sdk_h = useRef(undefined);

  useEffect(() => {
    faceTracker.current = document.querySelector("#faceTracker");
    if(props?.videoEl?.current && faceTracker?.current){
        bindEvent();
    }
    function bindEvent(){
        
        window.addEventListener(
            "CY_FACE_DETECTOR_RESULT",
            handleFaceEvents
          );
        window.addEventListener("CY_CAMERA_RESULT", setSdkDimensions);
    }

    function handleFaceEvents (evt)  {
        if (evt.detail && evt.detail.rects && evt.detail.rects.length > 0) {
        const $vid = props.videoEl.current;

        const scale_w = $vid.offsetWidth / sdk_w.current;
        const scale_h = $vid.offsetHeight / sdk_h.current;

        const y_diff = $vid.offsetHeight - (sdk_h.current*2);
        const x_diff = $vid.offsetWidth - (sdk_w.current *2);

        const offset_x = Math.round(x_diff / 2);
        const offset_y = Math.round(y_diff / 2);
        faceTracker.current.style.width =
            Math.round(evt.detail.rects[0].width * scale_w) + "px";
        faceTracker.current.style.height =
            Math.round(evt.detail.rects[0].height * scale_h) + "px";
        faceTracker.current.style.top =
            Math.round(evt.detail.rects[0].y * scale_h) +
            (y_diff > x_diff ? offset_y : 0) +
            "px";
        faceTracker.current.style.left =
            Math.round(evt.detail.rects[0].x * scale_w) +
            (y_diff < x_diff ? offset_x : 0) +
            "px";

        faceTracker.current.style.display = "block";
        resetTimeout();
        }
        
    }

    function setSdkDimensions (evt) {
        sdk_w.current= evt.detail.width;
        sdk_h.current= evt.detail.height;
    }

    function resetTimeout() {
    let to = timeout.current;
    clearTimeout(to);
    to =setTimeout(() => {
        setAllToZero();
    }, 3000)

    timeout.current= to;
    }
    function setAllToZero () {
    faceTracker.current.style.display = "none";
    }

  }, [props?.videoEl]);


  



  
  return (
    <>
    <div id="faceTrackerContainer">
        <div id="faceTracker"></div>
    </div>
    </>
    
  );
};

export default FaceTrackerComponent;
