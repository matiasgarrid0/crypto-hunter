import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CryptoState } from "../Context";

export const CoinsChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(1);
  const {currency} = CryptoState()

  const getHistoricData = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    setHistoricData(res.data.prices);
};

  useEffect(() => {
   getHistoricData();
    setFlag(true);
  }, [currency, days, coin]);
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <div>
      {!historicData ? (
        <>...loading</>
      ) : (
        <>
          <Line
            data={{
              labels: historicData?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData?.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                  backgroundColor: "#FFFCB0",
                  pointRadius: 0,
                },
              ],
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
            }}
          >
            {chartDays.map((day) => (
              <button
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setFlag(false);
                }}
                selected={day.value === days}
                className="button-days-chart"
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
