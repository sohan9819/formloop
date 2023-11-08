import React from "react";
import Link from "next/link";
import { Copy, MoveRight, MoveLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

type ShareLinkButtonProps = {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  showButton?: boolean;
};

const ShareLinkButton = ({
  open,
  onOpenChange,
  id,
  showButton = true,
}: ShareLinkButtonProps) => {
  const shareUrl =
    typeof window !== undefined
      ? `${window.location.origin}/submit/${id}`
      : `[domain]/submit/${id}`;

  const onClickCopy = () => {
    void navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showButton && (
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareUrl} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={onClickCopy}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="flex flex-col items-center justify-center sm:justify-start">
          <DialogClose asChild>
            <Button
              asChild
              type="button"
              variant="secondary"
              className="w-full"
            >
              <Link href={shareUrl} target="_blank">
                Visit link <ExternalLink className="ml-4 h-4 w-4" />
              </Link>
            </Button>
          </DialogClose>
        </DialogFooter>
        <div className="flex w-full justify-between">
          <Button asChild variant={"link"}>
            <Link href={"/"} className="gap-2">
              <MoveLeft />
              Go back home
            </Link>
          </Button>
          <Button asChild variant={"link"}>
            <Link href={`/forms/${id}`} className="gap-2">
              Form details
              <MoveRight />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkButton;
