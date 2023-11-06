import React from "react";

import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "@/components/form-builder/FormElementsSidebar";
import PropertiesFormSidebar from "@/components/form-builder/PropertiesFormSidebar";

const DesignerSidebar = () => {
  const { elements, selectedElement } = useDesigner();

  const isSelectedElementValid =
    selectedElement && elements.includes(selectedElement);

  return (
    <aside className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
      {isSelectedElementValid ? (
        <PropertiesFormSidebar />
      ) : (
        <FormElementsSidebar />
      )}
    </aside>
  );
};

export default DesignerSidebar;
