import React from "react";

const Button = ({
  classname = null,
  value = null,
  functionality = null,
  showref = null,
  showUI = null,
}) => {
  return (
    <button className={classname} ref={showref} onClick={functionality}>
      {value}
    </button>
  );
};

export default Button;
