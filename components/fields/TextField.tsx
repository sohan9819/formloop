import React from "react";
import { type ElementsType, type FormElement } from "../FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";
// const type = ElementsType.TEXT_FIELD;

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text field",
  },
};
