"use client";

import {
  createContext,
  type ReactNode,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";

import { type FormElementInstance } from "@/components/form-builder/FormElements";

type DeisgnerContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;

  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

const DeisgnerContext = createContext<DeisgnerContextType | null>(null);

const DeisgnerContextProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

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

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DeisgnerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </DeisgnerContext.Provider>
  );
};

export { DeisgnerContext, DeisgnerContextProvider };
