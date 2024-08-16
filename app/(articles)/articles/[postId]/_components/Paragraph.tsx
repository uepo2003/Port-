"use client";

import React from "react";

const Paragraph = ({ text }: { text: string }) => {
  return <p className="paragraph font-normal">{text}</p>;
};

export default React.memo(Paragraph);
