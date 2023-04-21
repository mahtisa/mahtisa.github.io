import "./pages.css";

import { ArrowLeft, Lock, MessageText1 } from "iconsax-react";
import { InferType, date, number, object, string } from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import ReactLoading from "react-loading";
import axios from "axios";
import logo from "../images/logo.png";
import robot from "../images/robot.png";
import { useAuthContextActions } from "../provider/AuthContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatchAuth = useAuthContextActions();
  const notifySuccess = () =>
    toast.success("!به نیوکوین اسپیس خوش آمدید", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyError = (value) =>
    toast.error(value, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const onSubmit = (values) => {
    setLoading(true);
    axios
      .post("https://apingweb.com/api/login", values, {
        "Content-Type": "application/json",
      })
      .then((respone) => {
        const walletInfo = {
          wallet_id: `${respone.data.result.id}`,
          wallet_coins: [
            {
              id: 1,
              name: "اتریوم",
              value: 256,
              color: "#7EB6F7",
            },
            {
              id: 2,
              name: "ترون",
              value: 189,
              color: "#2E2E2E",
            },
            {
              id: 3,
              name: "بیتکوین",
              value: 160,
              color: "#F7931A",
            },
          ],
          user_id: respone.data.result.id,
        };
        dispatchAuth(respone.data);
        axios
          .post(
            "https://6440c1e8fadc69b8e071ded2.mockapi.io/dornika/wallet",
            walletInfo
          )
          .then((response) => {
            localStorage.setItem("MOCKAPI", JSON.stringify(response.data));
            notifySuccess();
            setLoading(false);
            navigate("/panel", {
              state: {
                mockData: response.data,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.message === "User does not exist") {
          notifyError("!کاربر مورد نظر یافت نشد");
        } else {
          notifyError("مشکلی رخ داده است لطفا مجددا وارد شوید.");
        }
      });
  };
  const validationSchema = object({
    email: string()
      .required("ایمیل مورد نیاز است !")
      .email("ایمیل صحیح نمی باشد !"),
    password: string()
      .required("رمز عبور مورد نیاز است !")
      .min(6, "حداقل 8 کاراکتر"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <>
      <section className="login">
        <div className="row">
          <div className="col-lg-6 bg-blue d-flex flex-column align-items-center login-right">
            <h1>صرافی ارز دیجیتال نیو کوین اسپیس </h1>
            <p>
              خرید و فروش امن بیت‌کوین و ارزهای دیجیتال به بزرگترین بازار ارز
              دیجیتال ایران بپیوندید
            </p>
            <img src={robot} alt="robot_picture" />
          </div>
          <div className="col-lg-6 d-flex flex-column align-items-center login-left">
            <img src={logo} alt="logo_picture" className="mb-md-5 mb-3" />
            <h2 className="mb-md-2 mb-0">ورود به داشبورد</h2>
            <div className="link" onClick={clickHandler}>
              هنوز ثبت نام نکرده اید؟
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="my-5">
                <div className="input-box">
                  <label className="input-label">ایمیل</label>
                  <MessageText1 size="20" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="error-box">
                  {formik.errors.email && formik.touched.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
              </div>
              <div className="mb-5">
                <div className="input-box">
                  <label className="input-label">رمز عبور</label>
                  <Lock size="20" />
                  <input
                    type="password"
                    placeholder="حد اقل 8 کاراکتر"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="error-box">
                  {formik.errors.password && formik.touched.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                </div>
              </div>
              <button className="btn-blue" type="submit">
                {loading ? (
                  <ReactLoading
                    type={"spinningBubbles"}
                    color={"#fff"}
                    height={"20%"}
                    width={"20%"}
                    className="loading"
                  />
                ) : (
                  <>
                    ورود به حساب
                    <ArrowLeft size="20" className="me-3" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
