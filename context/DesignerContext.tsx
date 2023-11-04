"use client";

import { type FormElementInstance } from "@/components/form-builder/FormElements";
import { createContext, type ReactNode, useState } from "react";

type DeisgnerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
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

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <DeisgnerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DeisgnerContext.Provider>
  );
};

export { DeisgnerContext, DeisgnerContextProvider };
