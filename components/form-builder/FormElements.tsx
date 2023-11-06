import { type IconType } from "react-icons";

import { TextFieldFormElement } from "@/components/form-elements/TextField";

export enum ElementsType {
  TEXT_FIELD = "TextField",
  // NUMBER_FIELD = "NumberField",
}

export type ElementAttributes = {
  [ElementsType.TEXT_FIELD]: {
    label: string;
    placeholder: string;
    required: boolean;
    helperText: string;
  };
};

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: IconType;
    label: string;
  };

  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;

  formHeading?: string;
  formDescription?: string;
  formLogo?: string;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: ElementAttributes[ElementsType];
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
