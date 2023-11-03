import React from "react";
import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";

const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdPreview className="h-4 w-4" />
      Preview
    </Button>
  );
};

export default PreviewDialogBtn;
