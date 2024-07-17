import React from 'react'
import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}


export const Callout =({
  children,
  icon,
}: CalloutProps) => {
  return (
    <div
      className={cn("my-6 flex items-center rounded-md border border-l-4 p-4")}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

