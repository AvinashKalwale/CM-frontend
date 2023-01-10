import React from "react";
import { useNavigate } from "react-router-dom";

const UnAuthorize = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>UnAuthorize</div>
      <button onClick={() => navigate("/signup")}>signup</button>
      <button onClick={() => navigate("/login")}>login</button>
    </>
  );
};

export default UnAuthorize;
