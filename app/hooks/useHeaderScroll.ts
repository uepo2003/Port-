"use client";
import { useEffect, useState } from "react";

// スクロールを制御する
/**
 * @param {number}  activePoint - 表示のポイントを数値で取得
 * @return {boolean} 表示、非表示のbool値を返却する
 */
export const useHeaderScroll = (activePoint: number): boolean => {
  const [isHeaderActive, setIsHeaderActive] = useState<boolean>(false);

  useEffect(() => {
    const scrollWindow = () => {
      const ap = activePoint;
      let scroll = 0;
      scroll = window.scrollY;
      if (ap <= scroll) {
        setIsHeaderActive(true);
      } else if (scroll <= 50) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }
    };
    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, [activePoint]);

  return isHeaderActive;
};
