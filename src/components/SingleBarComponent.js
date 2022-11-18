import "./componentCSS/singleBarComponent.css"


const SingleBarComponent = (props) => {
  return (
    <>
    <div id="barContainer">
    <div className="progress-bar-container">
      <div
        className="progress-bar-indicator"
        style={{height: props.value + "%", backgroundImage: "linear-gradient(135deg,"+props.color1+" 0%, "+props.color2+" 100%"}}
      ></div>
    </div>

    <span className="barName mt-1">{props.name}</span>
</div>
    </>
    
  );
};

export default SingleBarComponent;
