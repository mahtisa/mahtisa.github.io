import "./panel.css";

import {
  ArrowSquareLeft,
  ArrowSquareRight,
  HambergerMenu,
  Notification,
} from "iconsax-react";
import { json, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import BarChartBlue from "../../components/panel/BarChartBlue";
import CoinList from "../../components/panel/coinList/CoinList";
import CoinsSlide from "../../components/panel/coinSlide/CoinsSlide";
import { LineChart } from "recharts";
import LineChartCompare from "../../components/panel/LineChartCompare";
import PipeChart from "../../components/panel/PipeChart";
import SideBarPanel from "../../components/panel/sideBarPanel/SideBarPanel";
import axios from "axios";
import profile from "../../images/profile.png";
import { register } from "swiper/element/bundle";
import { useAuthContext } from "../../provider/AuthContext";

register();
const getPercentCoin = (data, coin) => {
  const percent = data.filter((c) => c.name === coin.name);
  return percent.price_change_percentage_24h;
};
const getUserWalletInfo = (walletInfo, userId) => {
  const wallet = walletInfo.filter((w) => w.user_id === userId);
  return wallet[0].wallet_coins;
};
const getCoinPercent = (coins, value) => {
  let sum = 0;
  coins.forEach((c) => {
    sum += c.value;
  });
  return Math.round((value / sum) * 100);
};
const getCoinsColor = (coins) => {
  let colors = [];
  coins.forEach((c) => {
    colors.push(c.color);
  });
  return colors;
};
const makeData = (prices) => {
  let data = [];
  prices.forEach((price) => {
    data.push({
      name: Math.floor(price[0] / 1000),
      pv: Math.floor(price[1] / 1000),
    });
  });
  return data.slice(0, 7);
};
const Panel = () => {
  const [loading, setLoading] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [walletInfo, setWalletInfo] = useState([]);
  const [sideMenu, setSideMenu] = useState(false);
  const auth = useAuthContext();
  useEffect(() => {
    const userWalletInfo = JSON.parse(localStorage.getItem("MOCKAPI"));
    setWalletInfo(userWalletInfo);
    const swiperEl = document.querySelector("swiper-container");
    const swiperParams = {
      slidesPerView: 3,
      spaceBetween: 20,
      breakpoints: {
        360: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 1.2,
        },
         500: {
          slidesPerView: 1.7,
        },
        700: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: ".right_ch",
        prevEl: ".left_ch",
      },
      on: {
        init() {
          // ...
        },
      },
    };
    if (swiperEl) {
      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((respone) => {
        setLoading(false);
        setCoinsData(respone.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://6440c1e8fadc69b8e071ded2.mockapi.io/dornika/wallet")
      .then((response) => {
        if (auth && auth.result.id) {
          const userWallet = getUserWalletInfo(response.data, auth.result.id);
          localStorage.setItem("MOCKAPI", JSON.stringify(userWallet));
        }
      })
      .catch((error) => {
        console.log(error);
      });
      const fetchTrendingCoins = async () => {
        try {
          const result = await axios.get('https://api.coingecko.com/api/v3/search/trending');
          const coinIds = result.data.coins.map((coin) => coin.item.id);
          const coinDetails = await Promise.all(
            coinIds.map((coinId) =>
              axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            )
          );
          const sortedCoins = coinDetails
            .map((response) => response.data)
            .sort((coin1, coin2) => {
              return coin2.market_data.circulating_supply - coin1.market_data.circulating_supply;
            });
          setTrendingCoins(sortedCoins);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchTrendingCoins();
  }, []);
  return (
    <>
      <div className="panel">
        <SideBarPanel sideMenu={sideMenu} setSideMenu={setSideMenu} />
        <div className="main-panel">
          <header className="d-flex justify-content-between w-100 align-items-center header">
            <HambergerMenu size="24" onClick={()=> setSideMenu(true)} className="side-icon"/>
            <div className="left-header d-flex align-items-center">
              <div className="notification">
                <Notification size="24" />
                <div className="circle-notification"></div>
              </div>
              <img src={profile} alt="profile_picture" />
            </div>
          </header>
          <section className="coins-slider">
            <div className="slider-btn-holder">
              <ArrowSquareRight className="left_ch" />
              <ArrowSquareLeft className="right_ch" />
            </div>
            <swiper-container className="mySwiper" init="false">
              {coinsData &&
                coinsData.map((coin) => {
                  return <CoinsSlide key={coin.id} coin={coin} />;
                })}
            </swiper-container>
          </section>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-6 mb-md-0 mb-3">
                  <div className="panel-part-box">
                    <div>
                      <h2>دارایی های کیف پول</h2>
                      <div className="d-flex w-100 align-items-center">
                        <ul className="assets-list">
                          {walletInfo &&
                            walletInfo.map((w) => {
                              return (
                                <li key={w.id}>
                                  <div
                                    className="circle-li"
                                    style={{ background: w.color }}
                                  ></div>
                                  <h3>{w.name}</h3>
                                  <div className="text-mute">
                                    {getCoinPercent(walletInfo, w.value)}%
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                        <div className="pipe-chart-holder">
                          <PipeChart
                            coins={walletInfo}
                            colors={getCoinsColor(walletInfo)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="panel-part-box">
                    <div>
                      <h2 className="mb-3">ارزش معاملات هفته گذشته</h2>
                      <div className="bar-chart-holder">
                        <BarChartBlue/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <div className="panel-part-box">
                    <div className="line-chart-holder">
                      <LineChartCompare/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-lg-0 mt-3">
              <div className="panel-part-box trend">
                <div className="trend-box-head">
                  <h2>محبوب ترین کوین ها</h2>
                  <div className="select-holder">
                    <select>
                      <option value="">هفته</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between list-header">
                  <div>نام</div>
                  <div>24 ساعت گذشته</div>
                </div>
                <ul>
                  {trendingCoins &&
                    trendingCoins.map((coin) => {
                      return (
                        <CoinList
                          key={coin.id}
                          coin={coin}
                        />
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
