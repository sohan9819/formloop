import React from "react";

import { FormElements } from "@/components/form-builder/FormElements";
import SidebarBtnElement from "@/components/form-builder/SidebarBtnElement";

const FormElementsSidebar = () => {
  return (
    <>
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </>
  );
};

export default FormElementsSidebar;
