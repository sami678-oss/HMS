import React, { useEffect } from "react";

const FinisherHeader = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/finisher-header.es5.min.js"; // Directly reference the file in the public folder
    script.async = true;
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 100,
          size: {
            min: 2,
            max: 8,
            pulse: 0,
          },
          speed: {
            x: {
              min: 0,
              max: 0.4,
            },
            y: {
              min: 0,
              max: 0.6,
            },
          },
          colors: {
            background: "#201e30",
            particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"],
          },
          blending: "overlay",
          opacity: {
            center: 1,
            edge: 0,
          },
          skew: -0.4,
          shapes: ["c"],
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup the script tag after the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return <div className="finisher-header"></div>;
};

export default FinisherHeader;
