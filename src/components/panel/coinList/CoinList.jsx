import "./coinList.css";

import { useEffect, useState } from "react";

import axios from "axios";
import profile from "../../../images/profile.png";

const CoinList = ({ coin }) => {
  return (
    <>
      <li className="trend-list">
        <div className="right">
          <img src={coin.image.thumb} alt="coin_pic" />
          <h3 className="title">{coin.name}</h3>
          <div className="symbol">{coin.symbol}</div>
        </div>
        <div className="left text-green">{coin.sentiment_votes_down_percentage}%</div>
      </li>
    </>
  );
};

export default CoinList;
