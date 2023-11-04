import React from "react";

import { FormElements } from "@/components/form-builder/FormElements";
import SidebarBtnElement from "@/components/form-builder/SidebarBtnElement";

const DesignerSidebar = () => {
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
};

export default DesignerSidebar;
