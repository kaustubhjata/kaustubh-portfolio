import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

export default function VantaBackground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xc0c0c0,
          color2: 0x121212,
          size: 2.0,
          backgroundColor: 0x000000, // change background
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
  <div
    ref={vantaRef}
    style={{
      position: "fixed",
      inset: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -999,
    }}
  >
    {/* Blur overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(100px)",
        background: "rgba(0,0,0,0.3)", // optional soft darkening
      }}
    />
  </div>
);
}
