import { NavLink, Outlet } from "react-router-dom";

import logo from "../../images/logo.png";
import { useEffect } from "react";
import { useRef } from "react";

const Register = ({setPersonCircle,setContactCircle,setLocationCircle,setLocationText,setContactText}) => {
  const personCircle = useRef();
  const contactCircle = useRef();
  const locationCircle = useRef();
  const contactText = useRef();
  const locationText = useRef();
  useEffect(()=>{
    setPersonCircle(personCircle);
    setContactCircle(contactCircle);
    setLocationCircle(locationCircle);
    setLocationText(locationText);
    setContactText(contactText);
    const formData = JSON.parse(localStorage.getItem("formData"));
    if(formData){
      if(formData.name){
        personCircle.current.className = "circle completed";
      }
      if(formData.phoneNumber){
        contactCircle.current.className = "circle completed";
        contactText.current.className = "text-white";
      }
    }
  },[])
  return (
    <>
      <section className="register">
        <div className="row">
          <div className="col-xl-3 bg-blue reg-sidebar d-flex flex-column">
            <img src={logo} alt="logo_picture" />
            <h1>ثبت نام</h1>
            <div className="progress-bar-holder">
              <ul>
                <li>
                  <NavLink to={""} className="pr-list">
                    <div className="circle" ref={personCircle}></div>
                    اطلاعات فردی
                  </NavLink>
                </li>
                <div className="pr-line"></div>
                <li>
                  <NavLink to={"contact"} className="pr-list">
                    <div className="circle" ref={contactCircle}></div>
                    <span ref={contactText}>اطلاعات ارتباطی</span>
                  </NavLink>
                </li>
                <div className="pr-line"></div>
                <li>
                  <NavLink to={"location"} className="pr-list">
                    <div className="circle" ref={locationCircle}></div>
                    <span ref={locationText}>اطلاعات مکانی</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-9 d-flex flex-column align-items-center pt-4 reg-main">   
            <Outlet/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
