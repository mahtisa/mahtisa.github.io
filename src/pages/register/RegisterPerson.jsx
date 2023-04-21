import {
  ArrowLeft,
  Calendar2,
  Card,
  Lock,
  PasswordCheck,
  UserSquare,
} from "iconsax-react";
import { object, ref, string } from "yup";
import { useEffect, useState } from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  code: "",
  birthDate: "",
  password: "",
  password_confirmation: "",
};
const getDate = (date) => {
  return `${date.year}/${date.month.number}/${date.day}`;
};
const RegisterPerson = ({ personCircle }) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      formik.values.name = formData.name;
      formik.values.code = formData.code;
      formik.values.birthDate = formData.birthDate;
      setBirthDate(formData.birthDate);
      formik.values.password = formData.password;
      formik.values.password_confirmation = formData.password_confirmation;
    }
  }, []);
  const onSubmit = (values) => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    personCircle.current.className = "circle completed";
    if (formData) {
      formData.name = values.name;
      formData.code = values.code;
      formData.birthDate = values.birthDate;
      formData.password = values.password;
      formData.password_confirmation = values.password_confirmation;
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      localStorage.setItem("formData", JSON.stringify(values));
    }
    navigate("/register/contact", {
      state: values,
    });
  };
  const validationSchema = object({
    name: string().required("نام و نام خانوادگی مورد نیاز است!"),
    code: string().required("کد ملی شما مورد نیاز است!"),
    password: string()
      .required("رمز عبور مورد نیاز است!")
      .min(6, "رمز عبور می بایست حداقل 6 کاراکتر باشد!"),
    password_confirmation: string()
      .required("تائیدیه پسورد مورد نیاز است!")
      .oneOf([ref("password"), null], "رمز عبور باید یکی باشد"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  const dateHandler = (value) => {
    setBirthDate(value);
    formik.values.birthDate = getDate(value);
  };
  return (
    <>
      <h3>مرحله 1 از 3</h3>
      <p>لطفا اطلاعات خود را با دقت وارد نمائید</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-holder">
          <div className="my-5">
            <div className="input-box">
              <label className="input-label">نام و نام خانوادگی</label>
              <UserSquare size="20" />
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="محمد حسین رحمتی"
              />
            </div>
            <div className="error-box">
              {formik.errors.name && formik.touched.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>
          </div>
          <div className="mb-5">
            <div className="input-box">
              <label className="input-label">کد ملی</label>
              <Card size="20" />
              <input
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="208-1235-456"
              />
            </div>
            <div className="error-box">
              {formik.errors.code && formik.touched.code && (
                <div className="error">{formik.errors.code}</div>
              )}
            </div>
          </div>
          <div className="input-box">
            <label className="input-label">تاریخ تولد</label>
            <Calendar2 size="20" />
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={birthDate}
              onChange={(value) => dateHandler(value)}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="my-5">
            <div className="input-box">
              <label className="input-label">رمز عبور</label>
              <Lock size="20" />
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder=""
                autoComplete={formik.values.password}
              />
            </div>
            <div className="error-box">
              {formik.errors.password && formik.touched.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
          </div>
          <div className="mb-5">
            <div className="input-box">
              <label className="input-label">تائیدیه رمز عبور</label>
              <PasswordCheck size="20" />
              <input
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                placeholder=""
                autoComplete={formik.values.password_confirmation}
              />
            </div>
            <div className="error-box">
              {formik.errors.password_confirmation &&
                formik.touched.password_confirmation && (
                  <div className="error">
                    {formik.errors.password_confirmation}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="footer justify-content-end">
          <button className="btn-blue" type="submit">
            مرحله بعد <ArrowLeft size="20" className="me-3" />
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterPerson;
