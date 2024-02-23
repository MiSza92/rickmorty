import { useEffect, useState } from "react";

export const useGetWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      console.log("width efefef:>> ", width);
      return width as number;
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [width]);
  return width;
};
