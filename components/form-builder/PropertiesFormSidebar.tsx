import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "@/components/form-builder/FormElements";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div
      className="flex flex-col p-2"
      //   Todo : This is a temp fix for avoiding unselect of element
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => void setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
