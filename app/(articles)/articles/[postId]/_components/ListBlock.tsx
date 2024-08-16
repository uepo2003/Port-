"use client";
import React from "react";

const ListBlock = ({ items }: { items: string[] }) => {
  return (
    <ul className="list-disc list-inside">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default React.memo(ListBlock);
