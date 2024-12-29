"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useState ,useTransition } from "react";
import {Button} from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import {toast} from "sonner";

function DeleteDocument() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending , startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();


  const handleDelete = async ()=>{
    const roomId = pathname.split("/").pop();
    if(!roomId) return;

    startTransition(async ()=>{
        const {success} = await deleteDocument(roomId);

        if(success){
            setIsOpen(false);
            router.replace("/");
            toast.success("Room Deleted Successfully!");

        }else{
            toast.error("Faild to Delete Room ");
        }
    })
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"destructive"}>
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you Sure You Want To Delete ?</DialogTitle>
          <DialogDescription>
          This will delete the document and all its content , removing all
          users from this document .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className ="sm:justify-end gap-2">
            <Button 
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
            >
                {
                    isPending ? "Deleting ...":"Delete"
                }
            </Button>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter >
      </DialogContent>
    </Dialog>
  );
}
export default DeleteDocument;
