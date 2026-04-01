import React, { useState, useEffect } from "react";

let setGlobalLoader;

export function loading(show = false) {
  if (setGlobalLoader) setGlobalLoader(show);
}

export default function Loading() {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setGlobalLoader = setLoader;
    return () => { setGlobalLoader = null };
  }, []);

  if (loader === false) return null;

  return (
    <div className="flex medel center fixed top left fullPage index darkSide loaderBox">

      <div className="loader"></div>

    </div>
  );
}