// components/MobileDetector.js
"use client";

import { useEffect, useState } from "react";

export const MobileDetector = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    // Only check once on mount
    if (!initialCheckDone) {
      const checkMobile = () => window.matchMedia('(max-width: 1300px)').matches;
      setIsMobile(checkMobile());
      setInitialCheckDone(true);
    }
  }, [initialCheckDone]);

  return !isMobile ? children : null;
};