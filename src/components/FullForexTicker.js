import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import '../css/FullForexTicker.css';

const FullForexTicker = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartProperties = {
      width: 1200,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    const chart = createChart(chartRef.current, chartProperties);
    const candleSeries = chart.addCandlestickSeries();

    fetch("https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000")
      .then((res) => res.json())
      .then((data) => {
        const cdata = data.map((d) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candleSeries.setData(cdata);
      })
      .catch((err) => console.log(err));

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div className="FullViewChart">
      <p>ETHUSDT see forex chart</p><br/>
      <div ref={chartRef}></div>
    </div>
  );
};

export default FullForexTicker;
