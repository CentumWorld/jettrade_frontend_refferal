import React, { useEffect,useRef } from 'react';


const HeatMap = () => {
    const iframeRef = useRef(null);
    useEffect(() => {
        const handleLoad = () => {
          if (iframeRef.current) {
            const iframeContentWindow = iframeRef.current.contentWindow;
            // Access the contentWindow and perform any necessary operations
            // with the iframe's document or window objects
            console.log(iframeContentWindow);
          }
        };
    
        if (iframeRef.current) {
          iframeRef.current.addEventListener('load', handleLoad);
        }
    
        return () => {
          if (iframeRef.current) {
            iframeRef.current.removeEventListener('load', handleLoad);
          }
        };
      }, []);
    
      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          width: '990',
          height: '90vh',
          currencies: [
            'EUR',
            'USD',
            'JPY',
            'GBP',
            'CHF',
            'AUD',
            'CAD',
            'NZD',
            'CNY',
            'TRY',
            'SEK',
            'NOK',
            'DKK',
            'ZAR',
            'HKD',
            'SGD',
            'THB',
            'MXN',
            'IDR',
            'KRW',
            'PLN',
            'ISK',
            'KWD',
            'PHP',
            'MYR',
            'INR',
            'TWD',
          ],
          isTransparent: false,
          colorTheme: 'light',
          locale: 'in',
        });
        document.getElementById('tradingview-widget-script').appendChild(script);
      }, []);


    return (
        <div className='heat-map'>
      <p style={{ fontFamily: 'Calibri', fontSize: '20px', fontWeight: 600, color: '#5e72e4' }}>Heat Map</p>
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-script" id="tradingview-widget-script"></div>
        <div className="tradingview-widget-copyright">
          {/* <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a> */}
        </div>
      </div>
    </div>
    )
}

export default HeatMap