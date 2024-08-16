"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";

interface BlockProps {
  data: {
    file: {
      url: string;
    };
    caption: string;
  };
  type: string;
}

const ImageProp = ({ block }: { block: BlockProps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (block.data.file.url !== null) {
      setLoading(false);
    }
  }, [block.data.file.url]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center">
        <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center pt-6 w-full">
      <img
        src={block.data.file.url}
        alt={block.data.caption}
        loading="lazy"
        className="bg-cover border rounded-xl w-full h-[500px] object-cover my-0"
      />
      <p className="text-medium text-gray-500 font-medium">
        {block.data.caption}
      </p>
    </div>
  );
};

export default React.memo(ImageProp);
