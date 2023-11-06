import React from "react";
import { MdPreview } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "./FormElements";

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();

  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant={"outline"} className="gap-2">
    //       <MdPreview className="h-4 w-4" />
    //       Preview
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
    //     <div className="border-b px-4 py-2">
    //       <p className="text-lg font-bold text-muted-foreground">
    //         Form preview
    //       </p>
    //     </div>
    //   </DialogContent>
    // </Dialog>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      {/* Default max width sm:max-w-[425px] */}
      <DialogContent className="max-h-screen sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Form preview</DialogTitle>
          <DialogDescription>
            {/* Make changes to your form. Click save when you&apos;re done. */}
            This is how your form will look like to your users.
          </DialogDescription>
        </DialogHeader>
        {/* TODO : Add the preview form  */}
        <div className="flex max-h-[calc(100vh-5rem)] flex-grow flex-col items-center justify-center overflow-y-auto bg-accent bg-[url(/paper-light.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="flex h-full w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-8">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
