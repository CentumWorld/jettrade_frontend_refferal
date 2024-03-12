import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import "../css/Dashboard.css";

let tvScriptLoadingPromise;



export default function TradingViewWidget() {
  const navigate = useNavigate();
  const onLoadScriptRef = useRef();

  useEffect(() => {
    
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_86a77") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: true,
          withdateranges: true,
          range: "YTD",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          container_id: "tradingview_86a77",
        });
      }
    }
  }, []);

  const gotoDashboard = ()=>{

    navigate('/userdashboard/dashboard')
  }

  return (
    <>
      <div className="heading">
        <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Trading Chart</p>
      </div>
      <div className="tradingview-widget-container">
        <div id="tradingview_86a77" />
        {/* <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div> */}
      </div>
    </>
  );
}
