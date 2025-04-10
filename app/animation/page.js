// components/Animation.js
"use client";
import { useEffect, useState } from "react";
import stylesanimation from "./stylesanimation.module.css";

export const Animation = ({
  title = "ɪɴᴏᴠᴀꜱʏᴏɴᴜɴ 6 ʜᴀʀɪᴋᴀꜱɪ",
  delay = 2000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const renderAnimatedTitle = (text) => {
    return text.split("").map((char, i) => (
      <span
        className={`${stylesanimation.char} ${
          isAnimating ? stylesanimation.charVisible : ""
        }`}
        style={{ animationDelay: `${i * 0.05}s` }}
        key={i}
        data-char={char}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div
      className={`${stylesanimation.animationOverlay} ${
        isAnimating ? stylesanimation.overlayActive : ""
      }`}
    >
      <div className={stylesanimation.overlayContent}>
        <div className={stylesanimation.boxContainer}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`${stylesanimation.animatedBox} ${
                isAnimating ? stylesanimation.boxActive : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <h1 className={stylesanimation.heroTitle}>
          {renderAnimatedTitle(title)}
        </h1>
      </div>
    </div>
  );
};
