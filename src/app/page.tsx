"use client"
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: any) => void;
    };
  }
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const paramsObject = Object.fromEntries(searchParams.entries());

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(paramsObject));
      }
      window.parent.postMessage(paramsObject)
    }
  }, []);

  return (
    <div>
<p>dksdksd</p>
    </div>
  );
}
