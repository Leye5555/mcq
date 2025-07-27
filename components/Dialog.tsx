"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const MyDialog = ({
  children,
  viewSolutions,
}: {
  children: React.ReactNode;
  viewSolutions: () => void;
}) => {
  return (
    <Dialog open={true}>
      <DialogContent className="bg-blue-800">
        <DialogHeader>
          <DialogTitle className="text-white">
            Submission successful!
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => window?.location?.reload()}
            >
              New Challenge
            </Button>
          </DialogClose>
          <Button type="button" onClick={viewSolutions}>
            View Solutions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
