import React, { useEffect, useState } from "react";
import { getChart } from "../reducer/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const chart = useSelector((state) => state.chart);
  const [historicData, setHistoricData] = useState();
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();


  useEffect(() => {
    dispatch(getChart(id, currency, days));
    setHistoricData(chart.prices);
    setFlag(true);
  }, [dispatch, days,currency,id]);

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
              className='button-days-chart'
            >
              {day.label}
            </button>
          ))}
        </div>
      </>
    </div>
  );
};
