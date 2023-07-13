import React, { useEffect } from 'react';


const Screener = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: '90%',
      height: '90vh',
      defaultColumn: 'overview',
      defaultScreen: 'general',
      market: 'forex',
      showToolbar: true,
      colorTheme: 'light',
      locale: 'in',
    });

    document.querySelector('.tradingview-widget-container__widget').appendChild(script);

    return () => {
      const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
      if (widgetContainer && widgetContainer.contains(script)) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      {/* <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div> */}
    </div>
  );
};

export default Screener;