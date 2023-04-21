import { ArrowLeft, ClipboardTick, MessageText1, Mobile } from "iconsax-react";
import { InferType, date, number, object, string } from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef } from "react";

import { useFormik } from "formik";
import { useState } from "react";

const initialValues = {
  phoneNumber: "",
  email: "",
};
function generateOptNumbers() {
  const numbers = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 10).toString();
    numbers.push(randomNumber);
  }
  const numbersAsStrings = numbers.join("");
  return { numbers, numbersAsStrings };
}
const RegisterContact = ({ contactCircle, contactText }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData && formData.hasOwnProperty("phoneNumber")) {
      formik.values.phoneNumber = "0" + formData.phoneNumber;
      formik.values.email = formData.email;
    }
  }, []);
  const [optCode, setOptCode] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });
  const [code, setCode] = useState([]);
  const onSubmit = (values) => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    contactCircle.current.className = "circle completed";
    contactText.current.className = "text-white";
    if (formData && formData.hasOwnProperty("phoneNumber")) {
      formData.phoneNumber = values.phoneNumber.substr(1);
      formData.email = values.email;
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      values.phoneNumber = values.phoneNumber.substr(1);
      localStorage.setItem("formData", JSON.stringify({ ...values, ...state }));
    }
    navigate("/register/location", {
      state: { ...values, ...state },
    });
  };
  const validationSchema = object({
    phoneNumber: string()
      .required("شماره تماس مورد نیاز است!")
      .matches(/^[0-9]{11}$/, "شماره همراه صحیح نیست!"),
    email: string().required("ایمیل مورد نیاز است!").email("ایمیل معتبر نیست!"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  const optbox = useRef();
  const notifyCode = (value) =>
    toast.success(`${value} کد تائید شما :`, {
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
  const optHandler = (e) => {
    e.preventDefault();
    const { numbers, numbersAsStrings } = generateOptNumbers();
    setCode(numbers);
    optbox.current.style.display = "block";
    notifyCode(numbersAsStrings);
  };
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const optValidationHandler = (e, vorodi) => {
    const input = e.target.value;
    setOptCode({ ...optCode, [e.target.name]: e.target.value });
    if (vorodi) {
      if (input.length === 1) {
        vorodi.current.focus();
      }
    }
  };
  const phoneNumberValidation = (e) => {
    e.preventDefault();
    if (
      optCode.num1 === code[0] &&
      optCode.num2 === code[1] &&
      optCode.num3 === code[2] &&
      optCode.num4 === code[3]
    ) {
      optbox.current.style.display = "none";
    } else {
      notifyError("کد صحیح نمی باشد. لطفا دوباره امتحان کنید.");
    }
  };
  return (
    <>
      <h3>مرحله 2 از 3</h3>
      <p>لطفا اطلاعات خود را با دقت وارد نمائید</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-holder">
          <div className="my-5">
            <div className="input-box">
              <label className="input-label">شماره همراه </label>
              <Mobile size="20" />
              <input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                type="text"
                placeholder="09015671346"
                onBlur={formik.handleBlur}
              />
              <button
                className={
                  formik.errors.phoneNumber === undefined
                    ? "send-code"
                    : "send-code text-mute"
                }
                onClick={optHandler}
                disabled={!(formik.errors.phoneNumber === undefined)}
              >
                ارسال کد
              </button>
            </div>
            <div className="error-box">
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className="error">{formik.errors.phoneNumber}</div>
              )}
            </div>
            <div className="opt-box" ref={optbox}>
              <div className="opt-message">
                <ClipboardTick className="ms-3" color="#388AEA" />
                کد تائید به شماره {formik.values.phoneNumber} ارسال شده است. این
                کد تا 02:00 دقیقه دیگر معتبر است
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="code-text">کد تائید</div>
                <div>
                  <input
                    type="text"
                    maxLength="1"
                    ref={inputRef4}
                    className="opt-code"
                    name="num4"
                    onChange={optValidationHandler}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    ref={inputRef3}
                    className="opt-code"
                    name="num3"
                    onChange={(e) => optValidationHandler(e, inputRef4)}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    ref={inputRef2}
                    className="opt-code"
                    name="num2"
                    onChange={(e) => optValidationHandler(e, inputRef3)}
                  />
                  <input
                    type="text"
                    maxLength="1"
                    ref={inputRef1}
                    className="opt-code"
                    name="num1"
                    onChange={(e) => optValidationHandler(e, inputRef2)}
                  />
                </div>
                <button
                  className="btn-blue mt-4"
                  onClick={phoneNumberValidation}
                >
                  تائید شماره همراه
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="input-box">
              <label className="input-label">ایمیل</label>
              <MessageText1 size="20" />
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                placeholder="example@mail.com"
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="error-box">
              {formik.errors.email && formik.touched.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <NavLink className="prev" to={"/register"}>
            مرحله قبل
          </NavLink>
          <button
            className={!formik.isValid ? "btn-blue btn-mute" : "btn-blue"}
            type="submit"
            disabled={!formik.isValid}
          >
            مرحله بعد <ArrowLeft size="20" className="me-3" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterContact;
