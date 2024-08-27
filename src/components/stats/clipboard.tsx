"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Clipboard({ redirectURL }: { redirectURL: string }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(redirectURL).then(
      () => {
        setCopySuccess(true);
      },
      (err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess(false);
      },
    );
  };

  return (
    <Button
      onClick={copyTextToClipboard}
      className="flex gap-1"
      variant={"ghost"}
      size={"sm"}
    >
      {!copySuccess ? (
        "Copy URL"
      ) : (
        <>
          <CheckIcon />
          URL Copied
        </>
      )}
    </Button>
  );
}
