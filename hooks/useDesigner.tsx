"use client";

import { useContext } from "react";
import { DeisgnerContext } from "@/context/DesignerContext";

const useDesigner = () => {
  const context = useContext(DeisgnerContext);

  if (!context) {
    throw new Error("useDesigner must be used within a DesignerContext");
  }

  return context;
};

export default useDesigner;
