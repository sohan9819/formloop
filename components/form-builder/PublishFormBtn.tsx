import React from "react";
import { MdOutlinePublish } from "react-icons/md";

import { Button } from "@/components/ui/button";

const PublishFormBtn = () => {
  return (
    <Button className="gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
      <MdOutlinePublish className="h-4 w-4" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
