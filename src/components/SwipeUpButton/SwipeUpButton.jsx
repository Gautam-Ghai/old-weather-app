import React, { useEffect } from "react";
import "./SwipeUpButton.scss";

function SwipeUpButton(props) {
  useEffect(() => {
    if (props.theme) {
      document.getElementById("swipeButton").classList.add("dark-mode");
    } else {
      document.getElementById("swipeButton").classList.remove("dark-mode");
    }
  }, [props.theme]);
  return <button className="swipeButton" id="swipeButton" {...props} />;
}

export default SwipeUpButton;
