"use client";
import React from "react";

const TableBlock = ({ content }: { content: string[][] }) => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          {content[0].map((header, index) => (
            <th
              key={index}
              className="px-4 py-2 text-center border-b border-gray-300"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-4 py-2 text-center border-b border-gray-300"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(TableBlock);
