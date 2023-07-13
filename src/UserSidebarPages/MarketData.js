import React, { useEffect } from 'react'

const MarketData = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: 770,
      height: 450,
      symbolsGroups: [
        {
          name: 'Indices',
          originalName: 'Indices',
          symbols: [
            { name: 'FOREXCOM:SPXUSD', displayName: 'S&P 500' },
            { name: 'FOREXCOM:NSXUSD', displayName: 'US 100' },
            { name: 'FOREXCOM:DJI', displayName: 'Dow 30' },
            { name: 'INDEX:NKY', displayName: 'Nikkei 225' },
            { name: 'INDEX:DEU40', displayName: 'DAX Index' },
            { name: 'FOREXCOM:UKXGBP', displayName: 'UK 100' },
            { name: 'BITSTAMP:BTCUSD', displayName: 'BTC' },
            { name: 'COINBASE:ETHEUR', displayName: 'ETH' },
            { name: 'BINANCE:BNBUSDT', displayName: 'BNB1' },
            { name: 'BINANCE:BNBUSDT.P', displayName: 'BNB2' },
          ],
        },
        {
          name: 'Futures',
          originalName: 'Futures',
          symbols: [
            { name: 'CME_MINI:ES1!', displayName: 'S&P 500' },
            { name: 'CME:6E1!', displayName: 'Euro' },
            { name: 'COMEX:GC1!', displayName: 'Gold' },
            { name: 'NYMEX:CL1!', displayName: 'Crude Oil' },
            { name: 'NYMEX:NG1!', displayName: 'Natural Gas' },
            { name: 'CBOT:ZC1!', displayName: 'Corn' },
          ],
        },
        {
          name: 'Bonds',
          originalName: 'Bonds',
          symbols: [
            { name: 'CME:GE1!', displayName: 'Eurodollar' },
            { name: 'CBOT:ZB1!', displayName: 'T-Bond' },
            { name: 'CBOT:UB1!', displayName: 'Ultra T-Bond' },
            { name: 'EUREX:FGBL1!', displayName: 'Euro Bund' },
            { name: 'EUREX:FBTP1!', displayName: 'Euro BTP' },
            { name: 'EUREX:FGBM1!', displayName: 'Euro BOBL' },
          ],
        },
        {
          name: 'Forex',
          originalName: 'Forex',
          symbols: [
            { name: 'FX:EURUSD', displayName: 'EUR/USD' },
            { name: 'FX:GBPUSD', displayName: 'GBP/USD' },
            { name: 'FX:USDJPY', displayName: 'USD/JPY' },
            { name: 'FX:USDCHF', displayName: 'USD/CHF' },
            { name: 'FX:AUDUSD', displayName: 'AUD/USD' },
            { name: 'FX:USDCAD', displayName: 'USD/CAD' },
          ],
        },
      ],
      showSymbolLogo: true,
      colorTheme: 'light',
      isTransparent: false,
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
    <div className='market-data-heading'>
      <p style={{ fontFamily: 'Calibri', fontSize: '20px', fontWeight: 600, color: '#5e72e4' }}>Market Data</p>
      <div className='tradingview-widget-container'>
        <div className='tradingview-widget-container__widget'></div>
        {/* <div className='tradingview-widget-copyright'>
          <a href='https://in.tradingview.com/' rel='noopener nofollow' target='_blank'>
            <span className='blue-text'>Track all markets on TradingView</span>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default MarketData