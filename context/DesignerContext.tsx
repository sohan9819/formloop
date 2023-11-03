"use client";

import { type FormElementInstance } from "@/components/FormElements";
import { createContext, type ReactNode, useState } from "react";

type DeisgnerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

const DeisgnerContext = createContext<DeisgnerContextType | null>(null);

const DeisgnerContextProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return (
    <DeisgnerContext.Provider value={{ elements, addElement }}>
      {children}
    </DeisgnerContext.Provider>
  );
};

export { DeisgnerContext, DeisgnerContextProvider };
