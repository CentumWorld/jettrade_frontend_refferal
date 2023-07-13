
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet';
// import '../css/SignalTrading.css'

const SignalTradingChart = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: 1000,
      height: 490,
      defaultColumn: 'overview',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: 'light',
      locale: 'in'
    });

    scriptRef.current = script;
    const container = document.getElementById('tradingview-widget');
    container.appendChild(scriptRef.current);

    return () => {
      if (container && scriptRef.current && scriptRef.current.parentNode === container) {
        container.removeChild(scriptRef.current);
      }
    };
  }, []);


  return (
    <>
      <p style={{fontFamily:'Calibri',fontSize:'20px',fontWeight:600,color:'#5e72e4'}}> Cryptocurrency Market</p>
      <div className="tradingview-widget-container">
        <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          {/* <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a> */}
        </div>
        <Helmet>
          <script src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js" type="text/javascript" async />
        </Helmet>
      </div>
    </>
  )
}

export default SignalTradingChart