// src/components/AdSense.jsx
import { useEffect } from "react";

function AdSense({ slot, format = "auto", responsive = true, style = {} }) {
  useEffect(() => {
    try {
      // AdSense 스크립트 로드
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="ad-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-4285543298552704" // 👈 여기에 본인 AdSense ID 입력
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
}

export default AdSense;
