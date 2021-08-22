import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./SwipeUpDrawer.scss";

function SwipeUpDrawer({ isOpen, onClose, onOpen, children, theme }) {
  const prevIsOpen = usePrevious(isOpen);
  const controls = useAnimation();

  function onDragEnd(event, info) {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start("hidden");
      onClose();
    } else {
      controls.start("visible");
      onOpen();
    }
  }

  useEffect(() => {
    if (theme) {
      document.getElementById("swipeDrawer").classList.add("dark-mode");
    } else {
      document.getElementById("swipeDrawer").classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start("hidden");
    } else if (!prevIsOpen && isOpen) {
      controls.start("visible");
    }
  }, [controls, isOpen, prevIsOpen]);

  return (
    <motion.div
      drag="y"
      onDragEnd={onDragEnd}
      initial="hidden"
      animate={controls}
      transition={{
        type: "tween",
        damping: 40,
        stiffness: 400,
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      dragConstraints={{ top: 0 }}
      dragElastic={0}
      style={{
        bottom: isOpen ? 0 : 40,
      }}
      className="swipeDrawer"
      id="swipeDrawer"
    >
      {children}
    </motion.div>
  );
}

function usePrevious(value) {
  const previousValueRef = useRef();

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  return previousValueRef.current;
}

export default SwipeUpDrawer;
