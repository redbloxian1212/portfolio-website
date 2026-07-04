"use client";

import { useState } from "react";

export default function CopyLink({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="text-left hover:text-green-400 transition-colors"
    >
      {copied ? "copied" : label}
    </button>
  );
}