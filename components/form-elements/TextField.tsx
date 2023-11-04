import React from "react";
import {
  type ElementsType,
  type FormElementInstance,
  type FormElement,
  type ElementAttributes,
} from "@/components/form-builder/FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type CustomInstance = FormElementInstance & {
  extraAttributes: ElementAttributes[ElementsType.TEXT_FIELD];
};

const DesignerComponent: React.FC<{ elementInstance: FormElementInstance }> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export const TextFieldFormElement: FormElement = {
  type: "TextField" as ElementsType.TEXT_FIELD,
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
  construct: (id: string) => ({
    id,
    type: "TextField" as ElementsType.TEXT_FIELD,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text field",
  },
};
