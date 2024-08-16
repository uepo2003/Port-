"use client";
import React from "react";

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="code-block rounded-md bg-gray-800 p-4 text-white font-mono text-sm">
      <code>{code}</code>
    </pre>
  );
};

export default React.memo(CodeBlock);
