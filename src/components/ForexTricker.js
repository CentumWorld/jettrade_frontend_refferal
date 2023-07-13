import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import "../css/ForexTricker.css";

const ForexTricker = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartProperties = {
      width: 300,
      height: 50,
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
    <div className="mainChart">
      <p>chart</p>
      <div ref={chartRef}></div>
    </div>
  );
};

export default ForexTricker;
