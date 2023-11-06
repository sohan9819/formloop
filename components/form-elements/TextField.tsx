import React, { useEffect } from "react";
import { MdTextFields } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type ElementsType,
  type FormElementInstance,
  type FormElement,
  type ElementAttributes,
} from "@/components/form-builder/FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useDesigner from "@/hooks/useDesigner";

type CustomInstance = FormElementInstance & {
  extraAttributes: ElementAttributes[ElementsType.TEXT_FIELD];
};

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

const PropertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

type PropertiesSchema = z.infer<typeof PropertiesSchema>;

const DesignerComponent: React.FC<{ elementInstance: FormElementInstance }> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(PropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    // Update form default values when elementInstance changes
    form.reset({
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    });
  }, [
    element.extraAttributes.helperText,
    element.extraAttributes.label,
    element.extraAttributes.placeholder,
    element.extraAttributes.required,
    elementInstance,
    form,
  ]);

  const onSubmit = (values: PropertiesSchema) => {
    const { label, placeholder, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        placeholder,
        helperText,
        required,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
        onSubmit={(event) => event.preventDefault()}
      >
        <h2>Text field </h2>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter label text"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field.
                <br />
                It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter placeholder text"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The Helper Text for the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The required condition for the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const TextFieldFormElement: FormElement = {
  type: "TextField" as ElementsType.TEXT_FIELD,
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type: "TextField" as ElementsType.TEXT_FIELD,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text field",
  },
};
