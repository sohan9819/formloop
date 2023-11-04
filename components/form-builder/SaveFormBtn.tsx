import React from "react";
import { HiSaveAs } from "react-icons/hi";

import { Button } from "@/components/ui/button";

const SaveFormBtn = () => {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-4 w-4" />
      Save
    </Button>
  );
};

export default SaveFormBtn;
