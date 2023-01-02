import React, { useState } from "react";
// import "../App2.css"
import "./Login.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthConsumer } from "../useauth/Useauth";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [hide, setHide] = useState({ display: "none" });
  const [show, setShow] = useState({ display: "block" });
  const [data, setData] = useState({});
  const [errormsg, seterrormsg] = useState(
    "Enter Your Credentials to Enter Your Account"
  );
  const [errcolor, seterrcolor] = useState("#7f8c8d");

  const value = AuthConsumer();

  function handleview(action) {
    if (action === "show") {
      setType("text");
      setHide({ display: "block" });
      setShow({ display: "none" });
    } else {
      setType("password");
      setShow({ display: "block" });
      setHide({ display: "none" });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.password || !data.email) {
      return alert("Kindly fill all the fields");
    }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post("https://contactmangerbackend.herokuapp.com/login", data, config).then((res) => {
      if (res.data.status !== "success") {
        seterrormsg(res.data.message);
        seterrcolor("red");
      }

      if (res.data.jwt_token !== undefined) {
        value.setValue(res.data.jwt_token);
        value.setName(data.email);
        value.setId(res.data.userid);
        navigate("/contact");
      }
    });
  }
  return (
    <div className="main-div login-div">
      <form action="" onSubmit={handleSubmit} className="form-box">
        <p id="description" style={{ color: errcolor }}>
          {errormsg}
        </p>
        <input
          className="upper-input input"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          placeholder="User ID"
        />
        <div className="password-div">
          <input
            className="input"
            id="password-input"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={type}
            placeholder="Password"
          />
          <span className="icon-span">
            <AiFillEyeInvisible
              style={hide}
              className="eye"
              onClick={() => handleview("hide")}
            />
            <AiFillEye
              className="eye"
              style={show}
              onClick={() => handleview("show")}
            />
          </span>
        </div>
        <button className="button" type="submit">
          Sign In
        </button>
        <Link to="/signup" className="anchor">
          Sign Up
        </Link>
      </form>
    </div>
  );
};
export default Login;
