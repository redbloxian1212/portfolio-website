"use client";

import { useState } from "react";

export default function CopyLink({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS or denied permission); the label still shows the handle.
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-left transition-colors ${className}`}
    >
      {copied ? "copied ✓" : label}
    </button>
  );
}
