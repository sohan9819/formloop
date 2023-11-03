"use client";

import { type Form } from "@prisma/client";
import React from "react";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import PreviewDialogBtn from "./PreviewDialogBtn";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper-light.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;

// Timestamp : 1:08:11
