import "./coinsSlide.css";
import {} from "recharts";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import React, { PureComponent, useEffect } from "react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-line-chart-r5z0f";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area type="monotone" dataKey="uv" stroke="#2AC479" fill="#2AC479" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

const CoinsSlide = ({ coin }) => {
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`
  //     )
  //     .then((response) => {
  //       console.log("data:",response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [coin]);
  return (
    <>
      <swiper-slide>
        <div className="card-coin">
          <div className="card-coin-head mb-4">
            <div className="coin-profile">
              <img src={coin.image} alt="coin_picture" />
              <div>
                <h3 className="title">{coin.name}</h3>
                <div className="symbol">{coin.symbol}</div>
              </div>
            </div>
            <div className="coin-info">
              <div
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green price"
                    : "text-danger price"
                }
              >
                {coin.price_change_percentage_24h}%
              </div>
              <div>{coin.current_price} دلار</div>
            </div>
          </div>
          <div className="chart-holder">
            <Example />
          </div>
        </div>
      </swiper-slide>
    </>
  );
};

export default CoinsSlide;
