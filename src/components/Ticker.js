import React from "react";
import Ticker from "react-ticker";
import '../css/Ticker.css';
import ForexTricker from "./ForexTricker";

const MoveStuffAround = () => (
  <Ticker>
    {({ index }) => (
      <>
      
        <div className="forex-ticker">
            {/* <p style={{color:'black'}}>{index}</p> */}
            {/* <ForexTricker /> */}
            {/* <div id="tvchart"></div> */}
        </div>
        
      </>
    )}
  </Ticker>

    
);



export default MoveStuffAround;
