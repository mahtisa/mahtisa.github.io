import "./sideBarPanel.css"

import {Activity, ArrangeHorizontalSquare, EmptyWallet, Home3, Logout} from "iconsax-react";

import { NavLink } from "react-router-dom";
import logo from "../../../images/logo.png"
import { useRef } from "react";

const SideBarPanel = ({sideMenu,setSideMenu}) => {
  const sideRef = useRef();
  if(sideMenu){
    sideRef.current.style.right = "0"
  }
  const closeSideMenu = (e)=>{
    if (e.target === e.currentTarget) {
      setSideMenu(false);
      sideRef.current.style.right = "-280px"
    }
  }
    return ( 
       <>
        <div className="side-menu-panel">
          <div className="side-menu-head">
            <img src={logo} alt="logo_picture" />
            <h2>نیو کوین اسپیس</h2>
          </div>
          <ul>
            <li>
              <NavLink to="">
                <Home3 size="20" className="ms-3" />
                داشبورد
              </NavLink>
            </li>
            <li>
              <NavLink to="/sales">
                <ArrangeHorizontalSquare size="20" className="ms-3" />
                خرید و فروش
              </NavLink>
            </li>
            <li>
              <NavLink to="/report">
                <Activity size="20" className="ms-3" />
                گزارش بازار
              </NavLink>
            </li>
            <li>
              <NavLink to="/walet">
                <EmptyWallet size="20" className="ms-3" />
                کیف پول
              </NavLink>
            </li>
          </ul>
          <NavLink className="exit-btn">
              <Logout size="20" className="ms-3"/>
              خروج
          </NavLink>
        </div>
        <div className={sideMenu ? "cover" : ""} onClick={closeSideMenu}>
        <div className="side-menu-res" ref={sideRef}>
          <div className="side-menu-head">
            <img src={logo} alt="logo_picture" />
            <h2>نیو کوین اسپیس</h2>
          </div>
          <ul>
            <li>
              <NavLink to="">
                <Home3 size="20" className="ms-3" />
                داشبورد
              </NavLink>
            </li>
            <li>
              <NavLink to="/sales">
                <ArrangeHorizontalSquare size="20" className="ms-3" />
                خرید و فروش
              </NavLink>
            </li>
            <li>
              <NavLink to="/report">
                <Activity size="20" className="ms-3" />
                گزارش بازار
              </NavLink>
            </li>
            <li>
              <NavLink to="/walet">
                <EmptyWallet size="20" className="ms-3" />
                کیف پول
              </NavLink>
            </li>
          </ul>
          <NavLink className="exit-btn">
              <Logout size="20" className="ms-3"/>
              خروج
          </NavLink>
        </div>
        </div>
       </>
     );
}
 
export default SideBarPanel;