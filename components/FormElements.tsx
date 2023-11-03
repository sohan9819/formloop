import { type IconType } from "react-icons";
import { TextFieldFormElement } from "./fields/TextField";

// export enum ElementsType {
//   TEXT_FIELD = "TextField",
//   //   NUMBER_FIELD = "NumberField",
// }

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: IconType;
    label: string;
  };

  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
