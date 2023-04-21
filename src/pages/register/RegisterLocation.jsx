import { ArrowLeft, Location, Map1 } from "iconsax-react";
import { InferType, date, number, object, string } from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Modal } from "bootstrap";
import ModalBox from "../../components/modal/ModalBox";
import ReactLoading from "react-loading";
import axios from "axios";
import { locations } from "../../db/locations";
import { useAuthContextActions } from "../../provider/AuthContext";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";

const getLocations = () => {
  let states = [];
  locations.forEach((l) => {
    states.push({ id: l.id, state: l.state });
  });
  return states;
};
const getCities = (state) => {
  const selectedLocation = locations.filter((l) => l.state === state);
  return selectedLocation[0].cities;
};
const initialValues = {
  state: "",
  city: "",
  address: "",
  long: "",
  width: "",
};
const RegisterLocation = ({ locationText, locationCircle }) => {
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [locations, setLocations] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [long, setLong] = useState(0);
  const [width, setWidth] = useState(0);
  const dispatchAuth = useAuthContextActions();
  const navigate = useNavigate();
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData && formData.hasOwnProperty("state")) {
      formik.values.state = formData.state;
      formik.values.city = formData.city;
      formik.values.address = formData.address;
      formik.values.long = formData.long;
      formik.values.width = formData.width;
      setLong(formData.long);
      setWidth(formData.width);
    }
  }, []);
  useEffect(() => {
    setLocations(getLocations());
  }, []);
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
  const onSubmit = (value) => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData && formData.hasOwnProperty("state")) {
      formData.state = value.state;
      formData.city = value.city;
      formData.address = value.address;
      formData.long = value.long;
      formData.width = value.width;
      setLong(value.long);
      setWidth(value.width);
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      localStorage.setItem("formData", JSON.stringify({ ...value, ...state }));
    }
    formik.values.width = width;
    formik.values.long = long;
    const data = { ...value, ...state };
    const finalForm = {
      name: data.name,
      email: data.email,
      phone: data.phoneNumber,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };
    setLoading(true);
    axios
      .post("https://apingweb.com/api/register", finalForm, {
        "Content-Type": "application/json",
      })
      .then((respone) => {
        dispatchAuth(respone.data);
        notifySuccess();
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        notifyError("خطایی رخ داده است لطفا مجددا تلاش کنید.");
      });
    locationCircle.current.className = "circle completed";
    locationText.current.className = "text-white";
  };
  const validationSchema = object({
    state: string().required("استان مورد نیاز است!"),
    city: string().required("شهر مورد نیاز است!"),
    address: string().required("آدرس مورد نیاز است!"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    RegisterLocation: true,
  });
  const handleSelect = () => {
    if (formik.values.state) {
      setCities(getCities(formik.values.state));
    } else {
      setCities(getCities("تهران"));
    }
  };
  const positionHandler = (e) => {
    if (e.target.name === "long") {
      formik.values.long = e.target.value;
    } else {
      formik.values.width = e.target.value;
    }
  };
  return (
    <>
      <ModalBox
        showModal={showModal}
        setShowModal={setShowModal}
        setLong={setLong}
        setWidth={setWidth}
      />
      <h3>مرحله 3 از 3</h3>
      <p>لطفا اطلاعات خود را با دقت وارد نمائید</p>
      <form className="location" onSubmit={formik.handleSubmit}>
        <div className="form-holder">
          <div className="location-holder-box my-5">
            <div className="input-location ms-3 mb-md-0 mb-5">
              <div className="input-box">
                <label className="input-label">استان</label>
                <Location size="20" />
                <select
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onClick={handleSelect}
                >
                  <option value="">
                    {formik.errors.state && formik.touched.state ? (
                      <div className="text-danger error">
                        {formik.errors.state}
                      </div>
                    ) : (
                      "استان خود را انتخاب کنید"
                    )}
                  </option>
                  {locations.map((l) => {
                    return (
                      <option value={l.state} key={l.id}>
                        {l.state}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="error-box">
                {formik.errors.state && formik.touched.state && (
                  <div className="error">{formik.errors.state}</div>
                )}
              </div>
            </div>
            <div className="input-location">
              <div className="input-box">
                <label className="input-label">شهر</label>
                <Location size="20" />
                <select
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">
                    {formik.errors.city && formik.touched.city
                      ? formik.errors.city
                      : "شهر خود را انتخاب کنید"}
                  </option>
                  {cities &&
                    cities.map((city) => {
                      return (
                        <option value={city.name} key={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="error-box">
                {formik.errors.city && formik.touched.city && (
                  <div className="error">{formik.errors.city}</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="input-box">
              <label className="input-label">آدرس</label>
              <Map1 size="20" />
              <input
                type="text"
                placeholder="ایران مازندران ساری"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="error-box">
              {formik.errors.address && formik.touched.address && (
                <div className="error">{formik.errors.address}</div>
              )}
            </div>
          </div>
          <div className="d-flex mt-5">
            <div className="input-box w-50 ms-3 my-0">
              <label className="input-label">طول جغرافیایی</label>
              <Location size="20" />
              <input
                type="text"
                name="long"
                value={long}
                className="w-100"
                onChange={positionHandler}
              />
            </div>
            <div className="input-box w-50 my-0">
              <label className="input-label">عرض جغرافیایی</label>
              <Location size="20" />
              <input
                type="text"
                name="width"
                value={width}
                className="w-100"
                onChange={positionHandler}
              />
            </div>
          </div>
          <div className="select-map" onClick={() => setShowModal(true)}>
            انتخاب طول و عرض جغرافیایی از روی نقشه
          </div>
        </div>
        <div className="footer">
          <NavLink className="prev" to={"/register/contact"}>
            مرحله قبل
          </NavLink>
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
                ثبت نام
                <ArrowLeft size="20" className="me-3" />
              </>
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterLocation;
