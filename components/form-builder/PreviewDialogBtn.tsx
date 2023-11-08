import React, { useState } from "react";
import { ScanEye, Fullscreen } from "lucide-react";

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
  const [dialogState, setDialogState] = useState(false);

  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <ScanEye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Form preview</DialogTitle>
          <DialogDescription>
            Make changes to your form. Click save when you&apos;re done. This is
            how your form will look like to your users.
          </DialogDescription>
        </DialogHeader>
        <div className="flex max-h-[calc(100vh-128px-2.5rem)] flex-grow flex-col items-center justify-start overflow-y-auto bg-accent bg-[url(/paper-light.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="flex h-max w-full  flex-grow flex-col gap-4 rounded-2xl bg-background p-8">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <Button className="gap-2">
              Fullscreen <Fullscreen className="h-4 w-4" />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => setDialogState(false)}
            >
              Close Preview
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
