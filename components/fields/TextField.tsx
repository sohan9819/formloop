import React from "react";
import {
  type FormElementInstance,
  type ElementsType,
  type FormElement,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";
// const type = ElementsType.TEXT_FIELD;

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export const TextFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
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
