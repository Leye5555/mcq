"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
          <DialogDescription className="text-white">
            You can view your submission and the corrects answers by clicking
            view solutions
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => window?.location?.reload()}
            >
              Restart
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
