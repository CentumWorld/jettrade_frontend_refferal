import React, { useEffect, useRef } from 'react'

const EconomicCelender = () => {

  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '510',
      height: '500',
      locale: 'in',
      importanceFilter: '-1,0,1',
      currencyFilter: 'USD,EUR,ITL,NZD,CHF,AUD,FRF,JPY,ZAR,TRL,CAD,DEM,MXN,ESP,GBP',
    });

    const container = containerRef.current;

    if (container) {
      container.appendChild(script);
    }

    const iframe = document.createElement('iframe');
    iframe.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    iframe.style.display = 'none';

    const iframeLoadHandler = () => {
      const iframeBody = iframe.contentDocument.body;
      if (iframeBody) {
        iframeBody.appendChild(script);
      }
      iframe.removeEventListener('load', iframeLoadHandler);
    };

    iframe.addEventListener('load', iframeLoadHandler);
    container.appendChild(iframe);

    iframeRef.current = iframe;

    return () => {
      iframe.removeEventListener('load', iframeLoadHandler);
      if (iframeRef.current && iframeRef.current.parentNode) {
        iframeRef.current.parentNode.removeChild(iframeRef.current);
      }
    };
  }, []);

  return (
    <>
      <p style={{ fontFamily: 'Calibri', fontSize: '20px', fontWeight: 600, color: '#5e72e4' }}> Economic Celender</p>
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget">
          <iframe
            title="Economic Calendar"
            className="tradingview-widget-container__widget"
            ref={iframeRef}
          ></iframe>
        </div>
        <div className="tradingview-widget-copyright">
          {/* <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
        <span className="blue-text">Track all markets on TradingView</span>
      </a> */}
        </div>
      </div></>

  );
};


export default EconomicCelender