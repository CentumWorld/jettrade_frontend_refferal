import React from "react";
import Ticker from "react-ticker";
import '../css/Ticker.css';
import ForexTricker from "./ForexTricker";

const MoveStuffAround = () => (
  <Ticker>
    {({ index }) => (
      <>
      
        <div className="forex-ticker">

        </div>
        
      </>
    )}
  </Ticker>

    
);



export default MoveStuffAround;
