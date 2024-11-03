// components/GoogleAdsense.js
import Script from "next/script";

const GoogleAdsense = ({ pId }) => {
  // Only load AdSense in production
  if (process.env.NODE_ENV !== "production") {
    console.log(process.env.NODE_ENV,'node env')
    return null;
}
console.log(process.env.NODE_ENV,'node env --')

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
    //   strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;
