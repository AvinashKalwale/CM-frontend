import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import "../App.css";
const HoverOver = ({ Email, Phonenumber }) => {
  const [isHovering, setIsHovering] = useState(false);
  let emailabbre = Email;
  if (emailabbre.length >= 16) {
    emailabbre = emailabbre.slice(0, 13) + "...";
  }
  function handleMouseOver() {
    setIsHovering(true);
  }
  function handleMouseOut() {
    setIsHovering(false);
  }

  return (
    <>
      <ReactTooltip place="bottom" id="tool" />
      <div
        className="Email tool-inner  common-header-styles remove-border glossy-background tip "
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        data-for="tool"
        data-tip={Email}
        data-text-color="rgb(0, 214, 252)"
        data-background-color="rgb(70, 98, 103)"
      >
        {emailabbre}
      </div>
      <div
        className={
          isHovering
            ? "blue Phonenumber  common-header-styles remove-border glossy-background"
            : "Phonenumber  common-header-styles remove-border glossy-background"
        }
      >
        {Phonenumber}
      </div>
    </>
  );
};

export default HoverOver;
