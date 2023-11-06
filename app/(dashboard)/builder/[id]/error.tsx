"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl text-destructive">Something went wrong!</h2>
      <p className="text-destructive">{error.message}</p>
      <Button>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
};

export default Error;
