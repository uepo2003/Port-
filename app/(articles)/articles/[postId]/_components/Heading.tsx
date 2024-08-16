"use client";
import React from "react";

interface HeadingProps {
  level: number;
  text: string;
}

const Heading = ({ level, text }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClass = level === 1 ? "text-2xl" : "text-xl";

  return (
    <Tag
      className={`heading font-bold text-gray-500 tracking-tight pb-2 border-b ${sizeClass}`}
    >
      {text}
    </Tag>
  );
};

export default React.memo(Heading);
