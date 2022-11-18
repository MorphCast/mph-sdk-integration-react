import { useState, useEffect, useRef } from "react";
import "./componentCSS/featureComponent.css"


const FeatureComponent = () => {
  const [feat, setFeat] = useState(["","","","",""])
  const timeout = useRef(undefined);

  useEffect(() => {
    function resetTimeout() {
      let to = timeout.current;
      clearTimeout(to);
      to =setTimeout(() => {
        setFeat(["", "", "", "", ""]) ;
      }, 3000)

      timeout.current= to;
    }


    function extract(obj, n) {
        let sortable = [];
        for (var feature in obj) {
            sortable.push([feature, obj[feature]]);
        }
    
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        return sortable.slice(0, n);
    }
  
    function bindEvent(){
      window.addEventListener("CY_FACE_FEATURES_RESULT",handleFeatureEvent);
    }
    
    function handleFeatureEvent (evt) {
      resetTimeout();
      let features = extract(evt.detail.output.features, 5);
      setFeat(features.map(([feature]) => feature));
    }
    bindEvent();
  }, []);


  return (
    <>
    <p style={{fontSize:"20px"}}>Features Component:</p>
    <div
    className="wrap"
  >
    {(feat[0]) && <span className="feature"> { feat[0] }</span>}
    {(feat[1]) && <span className="feature"> { feat[1] }</span>}
    {(feat[2]) && <span className="feature"> { feat[2] }</span>}
    {(feat[3]) && <span className="feature"> { feat[3] }</span>}
    {(feat[4]) && <span className="feature"> { feat[4] }</span>}
    {(feat[5]) && <span className="feature"> { feat[5] }</span>}
    {(feat[6]) && <span className="feature"> { feat[6] }</span>}
    {(feat[7]) && <span className="feature"> { feat[7] }</span>}
  </div>
    </>
    
  );
};

export default FeatureComponent;
